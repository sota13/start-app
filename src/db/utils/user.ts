import { eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from '../schema/user';
import { profile, user } from "../schema/user";
import { db, sql} from '@/db'

type NewUser = typeof schema.user.$inferInsert;
type NewProfile = typeof schema.profile.$inferInsert;

export interface UpdateToken {
  userId:number;
  newToken:string
}


export const createUser = (userInfo: NewUser) => {
  return db.insert(user).values(userInfo).returning({ id: user.id, email:user.email });
}

export const createProfile = (profileInfo: NewProfile) => {
  return db.insert(profile).values(profileInfo).returning({ id:profile.id, userId:profile.userId,firstName: profile.firstName, lastName:profile.lastName });
}

export const updateRefreshToken = (tokenInfo: UpdateToken) => {
  return db.update(user)
  .set({ refreshToken: tokenInfo.newToken })
  .where(eq(user.id, tokenInfo.userId));
}

export const getUserById = async(id:number) => {
  const db = drizzle(sql, {schema});
  const user = await db.query.user.findFirst({
    where:eq(schema.user.id, id),
    columns: {
      id: true,
      email: true,
      role:true,
      isVerfied:true
    },
    with:{
      profile:true
    }
  })


  return user
  }
export const getUserByEmail = async(email:string) => {
  const db = drizzle(sql, {schema});
  const user = await db.query.user.findFirst({
    where:eq(schema.user.email, email),
    columns: {
      id: true,
      email: true,
      password:true,
      role:true,
      isVerfied:true
    },
    with:{
      profile:true
    }
  })


  return user
  }
  
  
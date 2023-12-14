import { getUserById } from "@/db/utils/user";
import * as jose from 'jose'
import {  cookies } from 'next/headers'

const access_secret = new TextEncoder().encode(
    process.env.ACCESS_TOKEN_SECRET,
  )

const refresh_secret = new TextEncoder().encode(
    process.env.REFRESH_TOKEN_SECRET,
  )

interface VerifyResult {
  isValid:boolean,
  userId:number | null
}

interface GeneratedToken {
  newAccessToken:string,
  newRefreshToken:string

}

export const isAccessTokenValid = async (token:string):Promise<VerifyResult> => {
  try{
    const {payload:{userId}}:any = await jose.jwtVerify(token, access_secret)
    return {
      isValid:true,
      userId,
    }
  }catch{
    return {
      isValid:false,
      userId:null,
    }
  }
}

//this function will check if the refresh token is valid
export const isRefreshTokenValid = async (token:string):Promise<VerifyResult> => {
  try{
    const {payload:{userId}}:any = await jose.jwtVerify(token, refresh_secret)
    return {
      isValid:true,
      userId,
    }
  }catch{
    return {
      isValid:false,
      userId:null,
    }
  }
}


export const getUserIdFromToken = async (token: string) => {
    try {
        const { payload }:any = await jose.jwtVerify(token, access_secret)
        return payload.userId;
    } catch (error: any) {
        return null;
    }

}
export const getUserIdFromRefreshToken = async(token: string) => {
    try {
        const { payload }:any = await jose.jwtVerify(token, refresh_secret)
        return payload.userId;
    } catch (error: any) {
        return null;
    }

}

export const getUserFromRefreshToken = async () => {
    console.log('getUserFromRefreshToken has been called')
    const refreshToken = cookies().get('refreshToken')?.value || ''
    if(!refreshToken) return null
    const userId = await getUserIdFromRefreshToken(refreshToken)
    if(!userId) return null
    const user = await getUserById(userId)
    return user
}

// It sould be only authenticated user or protected page which can call this function
export const getUserFromToken = async () => {
    try{
      console.log('getUserFromToken has been called')
      const accessToken = cookies().get('accessToken')?.value || ''
      const refreshToken = cookies().get('refreshToken')?.value || ''
      if(!accessToken || !refreshToken) return null
      const {userId} = await isAccessTokenValid(accessToken)
      if(userId) {
        console.log('we will retun the user')
        return await getUserById(userId)
      }
      const {userId:userId2} = await isRefreshTokenValid(refreshToken)
      console.log('we will retun the user2')
      if(userId2) {
        return await getUserById(userId2)
      }
    }catch(error){
      console.log(error)
      throw new Error('sorry somthing went wrong!')
    }
}


export const generateToken = async (userId:number) : Promise<GeneratedToken> => {
  //create accessToken
  const newAccessToken = await new jose.SignJWT({ 'userId': userId })
  .setProtectedHeader({ alg:'HS256' })
  .setIssuedAt()
  .setExpirationTime('1h')
  .sign(access_secret)

  //create refreshToken
  const newRefreshToken = await new jose.SignJWT({ 'userId': userId })
  .setProtectedHeader({ alg:'HS256' })
  .setIssuedAt()
  .setExpirationTime('3d')
  .sign(refresh_secret)

  return {
    newAccessToken,
    newRefreshToken
  }
}

export const generateAndSetToken = async (userId:number) : Promise<boolean> => {
  //create accessToken
  const newAccessToken = await new jose.SignJWT({ 'userId': userId })
  .setProtectedHeader({ alg:'HS256' })
  .setIssuedAt()
  .setExpirationTime('1h')
  .sign(access_secret)

  //create refreshToken
  const newRefreshToken = await new jose.SignJWT({ 'userId': userId })
  .setProtectedHeader({ alg:'HS256' })
  .setIssuedAt()
  .setExpirationTime('3d')
  .sign(refresh_secret)

   // Set cookie
   cookies().set('accessToken', newAccessToken,{httpOnly:true,secure:true})
   cookies().set('refreshToken', newRefreshToken,{httpOnly:true,secure:true})

  return true
}


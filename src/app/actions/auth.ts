'use server'
 
import { cookies } from 'next/headers'
import * as jose from 'jose'

const access_secret = new TextEncoder().encode(
    process.env.ACCESS_TOKEN_SECRET,
  )

const refresh_secret = new TextEncoder().encode(
    process.env.REFRESH_TOKEN_SECRET,
  )
 
export async function createNewToken() {
    try {
        const refreshToken = cookies().get('refreshToken')?.value || ''
        if(!refreshToken) throw new Error('no token provided')

        // this function will verify the token and if it valid will retura a payload that contin user id
        const { payload }:any = await jose.jwtVerify(refreshToken, refresh_secret)
    
        //create new accessToken
        const newAccessToken = await new jose.SignJWT({ 'userId': payload.userId })
        .setProtectedHeader({ alg:'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(access_secret)
    
        //create new refreshToken
        const newRefreshToken = await new jose.SignJWT({ 'userId': payload.userId })
        .setProtectedHeader({ alg:'HS256' })
        .setIssuedAt()
        .setExpirationTime('3d')
        .sign(refresh_secret)

          // Set cookie
        cookies().set('accessToken', newAccessToken,{httpOnly:true,secure:true})
        cookies().set('refreshToken', newRefreshToken,{httpOnly:true,secure:true})


    
        return {
            userId:payload.userId,
            newAccessToken,
            newRefreshToken,
            created:true
        }
    
      }catch(e){
        console.log(e)
        // Delete cookie
        cookies().delete('accessToken')
        cookies().delete('refreshToken')
        return {
          userId:null,
          newAccessToken:null,
          newRefreshToken:null,
          created:false
      }
      }
}
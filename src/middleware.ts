import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'


const access_secret = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET,
)

const refresh_secret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET,
)

 
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || ''
  if(!accessToken) {
    return NextResponse.json({error: 'there is no accessToken'}, {status: 401})
  }
  if (request.headers.has("userId")) {
    console.warn("The frontrnd tried to pass userId, which is only supposed to be a backend internal header. Ignoring.");
    request.headers.delete("userId");
  }


  try {
    const { payload:{userId} }:any = await jose.jwtVerify(accessToken, access_secret)
    console.log('access token is not expired')
    return NextResponse.next({
      headers: {
        'userId': userId,
      }
    })
  }catch(e){
    console.log('access token is expired')
  }

  try {
    const {payload:{userId}}:any = await jose.jwtVerify(refreshToken, refresh_secret)

    const response = NextResponse.next({
      headers: {
        'userId': userId,
      }
    })

    //create new accessToken
    const newAccessToken = await new jose.SignJWT({ 'userId': userId })
    .setProtectedHeader({ alg:'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(access_secret)

    //create new refreshToken
    const newRefreshToken = await new jose.SignJWT({ 'userId': userId })
    .setProtectedHeader({ alg:'HS256' })
    .setIssuedAt()
    .setExpirationTime('3d')
    .sign(refresh_secret)

    response.cookies.set('accessToken', newAccessToken,{httpOnly:true,secure:true})
    response.cookies.set('refreshToken', newRefreshToken,{httpOnly:true,secure:true})

    return response

  }catch(e){
    console.log('refresh token is expired')
    return NextResponse.json({error: 'refresh token is expired'}, {status: 401})
  }


  

  
}
 
export const config = {
  matcher: '/api/users/profile',
}
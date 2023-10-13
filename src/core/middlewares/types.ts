export interface JWTTokenPayload {
  id: string
  email: string
  role: string
  userDetail: {
    name: string
    phoneNumber: string
    address: string
  }
}

export { default } from "next-auth/middleware"



// The pages that are only visible to authenticated user shall be placed here
// example "/dashboard/:path*" Any path that has dashboard in front
export const config = { matcher: ["/dashboard", "/api/faculty/:path*", "/api/admin/:path*"] }
import { NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  console.log("proxy");
  //Get all headers từ browser gửi lên
  const allHeaders = new Headers(request.headers);
  allHeaders.set("x-token", "123");
  const response = NextResponse.next({
    request: {
      headers: allHeaders,
    },
  });
  response.cookies.set("token", "hello-k-17");
  return response;
};

export const config = {
  matcher: ["/products/:path*", "/about/:path*"],
};

//proxy -> layout -> page
//Nếu dùng proxy để set cookie --> khi nào page render xong (trả về trình duyệt) thì cookie sẽ được set

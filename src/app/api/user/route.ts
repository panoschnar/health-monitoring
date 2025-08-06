//GET User by id
export async function POST(req: Request) {
    const { access_token, id } = await req.json();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("API_KEY", `${process.env.API_KEY}`);
    myHeaders.append("Authorization", `Bearer ${access_token}`);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
  
    try {
      const response = await fetch(
        `${process.env.API_URL}/users/${id}`,
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error(`Error on getting user: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
      console.error("Error on getting user:", error);
  
      return new Response(
        JSON.stringify({
          error: "Error on getting user",
          message: error.message,
        }),
        { status: 400 }
      );
    }
  }

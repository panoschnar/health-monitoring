
//Get All patients 
export async function POST(req: Request) {
  const { access_token } = await req.json();
  if (!access_token) {
    return new Response(
      JSON.stringify({ error: 'Access token is required' }),
      { status: 401 }
    );
  }
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
      `${process.env.API_URL}/patients`,
      requestOptions
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
console.log(data)
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Error on getting patients:", error);

    return new Response(
      JSON.stringify({ error: "Error on getting patients", message: error.message }),
      { status: 400 }
    );
  }
}

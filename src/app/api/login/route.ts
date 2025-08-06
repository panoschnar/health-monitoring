export async function POST(req: Request) {
  const { email, password } = await req.json();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("API_KEY", `${process.env.API_KEY}`);

  const requestBody = JSON.stringify({ email, password });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: requestBody,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.API_URL}/users/login`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Login failed: ${response.status}`);
    }

    return new Response(JSON.stringify({ access_token: data.access_token }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Login error:", error);

    return new Response(
      JSON.stringify({ error: "Login failed", message: error.message }),
      { status: 400 }
    );
  }
}

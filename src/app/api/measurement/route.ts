export async function POST(req: Request) {
    const { access_token, measurements } = await req.json();

    // Validate required fields early
  if (!access_token) {
      return new Response(JSON.stringify({ error: "Missing required data" }), {
          status: 400,
        });
    }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("API_KEY", `${process.env.API_KEY}`);
  myHeaders.append("Authorization", `Bearer ${access_token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ measurements }),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${process.env.API_URL}/measurements`,
      requestOptions
    );
    const data = await response.json();
console.log(data)
    if (!response.ok) {
      throw new Error(`Error creating measurements: ${response.status}`);
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    console.error("Error creating measurements:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create measurements",
        message: error.message,
      }),
      { status: 400 }
    );
  }
}

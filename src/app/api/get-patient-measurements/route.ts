export async function POST(req: Request) {
  const { access_token, patientId } = await req.json();
  // Validate required fields early
  if (!patientId || !access_token) {
    return new Response(JSON.stringify({ error: "Missing required data" }), {
      status: 400,
    });
  }

  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("API_KEY", `${process.env.API_KEY}`);
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    const response = await fetch(
      `${process.env.API_URL}/measurements/patient/${patientId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to fetch measurements");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch measurements",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

//Add Patient
export async function POST(req: Request) {
  const { frontendData, access_token } = await req.json();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("API_KEY", `${process.env.API_KEY}`);
  myHeaders.append("Authorization", `Bearer ${access_token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(frontendData),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${process.env.API_URL}/patients`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error on creating Patient: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ status: 200, message: "Patient added successfully" })
    );
  } catch (error: any) {
    console.error("Error on creating Patient:", error);

    return new Response(
      JSON.stringify({
        error: "Error on creating Patient:",
        message: error.message,
      }),
      { status: 400 }
    );
  }
}

async function fetchModel(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Lỗi từ server: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi mất mạng hoặc server từ chối:", error);
    throw error;
  }
}

export default fetchModel;

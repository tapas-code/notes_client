import API from "./axios";

export const fetchNotes = async (token: string) => {
  try {
    const response = await API.get("/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching Notes: ", error);
    return error.response.data.message;
  }
};

export const createNote = async (
  token: string,
  title: string,
  content: string
) => {
  try {
    const response = await API.post(
      "/notes",
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error Creating Note: ", error);
    return error.response.data.message;
  }
};

export const deleteNote = async (token: string, noteId: string) => {
  try {
    await API.delete(`/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error("Error deleting Note: ", error);
    return error.response.data.message;
  }
};

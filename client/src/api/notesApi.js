const API_URL = "http://localhost:4000/notes";

export const fetchNotes = async () => {
    const response = await fetch (API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch notes");
    }

    return response.json();
}

export const createNote = async (note) => {
    const response = await fetch (API_URL, {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });

    if (!response.ok) {
        throw new Error("Failed to create note");
    }

    return response.json();
}
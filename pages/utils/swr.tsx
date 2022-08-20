export const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data: any = await response.json();
    return data;
};

export default fetcher;

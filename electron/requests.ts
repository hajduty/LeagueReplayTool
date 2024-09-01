import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance = axios.create({
  httpsAgent,
});

export const postRender = async (data: any) => {
    try {
        const response = await axiosInstance.post<any>("https://127.0.0.1:2999/replay/render", { [data.key]: data.value });
        //console.log({ [data.key]: data.value });
        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}

export const getRender = async () => {
    try {
        const response = await axiosInstance.get<any>("https://127.0.0.1:2999/replay/render");
        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}
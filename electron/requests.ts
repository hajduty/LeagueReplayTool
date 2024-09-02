import axios from "axios";
import { StartLoggingOptions } from "electron/main";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance = axios.create({
  httpsAgent,
});

export const postReq = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.post<any>(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(data);
        //console.log({ [data.key]: data.value });
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.data);
        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}

export const getReq = async (url: string) => {
    try {
        const response = await axiosInstance.get<any>(url);
        //console.log({ [data.key]: data.value });
        //console.log(response.data);
        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}
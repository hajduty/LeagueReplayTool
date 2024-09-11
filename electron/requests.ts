import axios from "axios";
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
		return response.data;
	}
	catch (e) {
		console.log(e);
	}
}

export const getReq = async (url: string) => {
	try {
		const response = await axiosInstance.get<any>(url);
		return response.data;
	}
	catch (e) {
		console.log(e);
	}
}
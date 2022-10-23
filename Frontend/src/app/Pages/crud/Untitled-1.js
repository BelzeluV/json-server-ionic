
import { urlsAws } from "../resources/foo/api-endpoints";
import { decrypt } from "./utiles";

const ausenciasService = {
    getausencias: (emplid, setData, setEstadoCarga, currentData, userDt = undefined) => {
        let requestOptions = {};
        const urlBase = window.location.pathname.split("/nuevo");
        requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("jwtAuth"), charset: "utf-8" },
        };
        fetch(urlsAws.getAusencias + localStorage.getItem("jwtId") + "&rcd=0&country=CHL" + "&emplid=" + emplid + "&userDt=" + userDt, requestOptions)
        .then((response) => response.json()).then((data) => {
                if (data !== undefined && data !== null) {
                    if (data.response !== undefined) {
                        if (!Array.isArray(data.response.ausencias)) {
                            data.response.ausencias = [data.response.ausencias];
                        }
                        data.response.ausencias.forEach((ausencia, index) => {
                            Object.keys(ausencia).forEach((key) => {
                                data.response.ausencias[index][key] = decrypt(ausencia[key]);});
                        });
                        caches.open("api-cache-AUSENCIAS").then((cache) => {
                            cache.put(urlsAws.getAusencias + "?rut=" + emplid + "&rcd=0&country=CHL", new Response(JSON.stringify(data.response.ausencias)));
                            if (urlBase[1].includes("-dt")) {
                                setData(data.response.ausencias);
                            } else {
                                setEstadoCarga(false);
                                setData(data.response.ausencias);
                            }
                        });
                    } else if (data.message !== undefined && data.message !== null) {
                        if (urlBase[1].includes("-dt")) {
                            setData(false);
                        } else {
                            setEstadoCarga(true);
                            if (currentData === 1) {
                                setData("1");
                            } else {
                                setData(1);
                            }
                        }
                    }
                }    
                else {
                    if (urlBase[1].includes("-dt")) {
                        setData(false);
                    } else {
                        setEstadoCarga(true);
                        setData(2);
                    }
                }
            }).catch((error) => {
                console.log("error", error);
                caches.match(urlsAws.getAusencias + "?rut=" + emplid + "&rcd=0&country=CHL").then((response) => {
                    if (response) {
                        response.json().then((data) => {
                            setData(data);
                        });
                    } else {
                        if (urlBase[1].includes("-dt")) {
                            setData(false);
                        } else {
                            setEstadoCarga(true);
                            setData(2);
                        }
                    }
                });
            });
    },
};

export default ausenciasService;
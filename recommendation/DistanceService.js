import axios from "axios";

async function getCoordinates(address) {
    const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json",
                limit: 1,
            },
            headers: {
                "User-Agent": "FestivalBackend/1.0",
            },
        }
    );

    if (!data.length) {
        throw new Error(`Address not found: ${address}`);
    }

    return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon),
    };
}

async function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

async function getDistanceBetween(address1, address2) {
    const a = await getCoordinates(address1);
    const b = await getCoordinates(address2);

    return await calculateDistance(
        a.lat,
        a.lon,
        b.lat,
        b.lon
    );
}


export default getDistanceBetween;
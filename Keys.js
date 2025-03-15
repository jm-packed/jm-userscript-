function APIKEY() {
    const APIKEY = [
        "BaconButProV5W9X3Y7Z1A6B0C4",
        "Jm-key143442",
        "ExampleKey67890"
    ];
    return APIKEY;
}

function isValidKey(userKey) {
    return APIKEY().includes(userKey);
}

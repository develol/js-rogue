class Random {
    integer(min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
}
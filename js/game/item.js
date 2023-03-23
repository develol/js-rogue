class Item {
    createItemOnMap(map, type) { // СОЗДАНИЕ ПРЕДМЕТА НА КАРТЕ
        var tileXY = map.randomTile();
        map.changeTile(tileXY[0], tileXY[1], type);
    }
}
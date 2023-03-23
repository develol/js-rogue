class Item {
    createItemOnMap(map, type) { // CREATING AN ITEM ON THE MAP
        var tileXY = map.randomTile();
        map.changeTile(tileXY[0], tileXY[1], type);
    }
}
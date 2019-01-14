interface ItemPoeModel {
    verified: boolean
    w: number,
    h: number,
    ilvl: number,
    icon: string,
    league: string,
    id: string,
    sockets: Array<SocketPoeModel>,
    name: string,
    typeLine: string,
    identified: boolean
    properties: Array<any>,
    requirements: Array<any>,
    frameType: number
    category: Array<any>
    x: number,
    y: number
    inventoryId: number,
    socketedItems: Array<any>
}
function responsePoeModelMapper(responsePoeModel: ResponsePoeModel) {
    const type = responsePoeModel.tabs.filter(value => value.selected).pop().type || "";
    return {
        tabs: responsePoeModel.tabs,
        numTabs: responsePoeModel.numTabs,
        stash: {
            items: responsePoeModel.items,
            type: type
        }
    }
}
export default responsePoeModelMapper;
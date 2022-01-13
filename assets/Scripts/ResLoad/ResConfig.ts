/**主资源需要立刻加载的*/
export enum AssetType {
    None = 0,
    /**预制体 */
    Prefab,
    /**字体 */
    Font,
    /**音效 */
    Audio,
    /**精灵 */
    SpriteFrame,
    /**图集 */
    SpriteAtlas,
    /**json*/
    Json,
}

/**资源加载类型 */
export enum ResLoadType {
    /**不加载 自己手动加载的*/
    None,
    /**优先加载 load的时候就加载*/
    First,
    /**分帧加载 这个需要设置一帧加载多少个资源默然一帧加载5个资源*/
    Frame
}

/**资源数据 */
export class ResData {
    /**资源名字 */
    resName: string = "";
    /**路径 */
    path: string = "";
    /**资源名字 */
    fullPath: string = "";
    /**类型 */
    type: AssetType = AssetType.None;
    /**bundle名称,如果是resources路径下为"" */
    bundleName: string = "";
    /**资源加载类型*/
    loadType: ResLoadType = ResLoadType.None;
    /**FGUI包名 */
    fGUIPackName: string = "";
    /**FGUI资源名字*/
    fGUIResName: string = "";
    /**
     * 
     * @param resName 资源名称
     * @param path 资源路径
     * @param type 资源类型
     * @param bundleName  bundle名称默认""在resources目录下
     * @param loadType 加载类型默认不加载
     * @param fPackName fgui包名
     * @param fResName fgui资源名
     */
    constructor(resName: string, path: string, type: AssetType, bundleName: string = "",
        loadType: ResLoadType = ResLoadType.None, fPackName: string = "",
        fResName: string = ""
    ) {
        this.type = type;
        this.path = path;
        this.resName = resName;
        this.bundleName = bundleName;
        this.loadType = loadType;
        this.fullPath = this.resName + "/" + this.resName;
        this.fGUIPackName = fPackName;
        this.fGUIResName = fResName;
    }
}

export class ResMap {
    public static resConfigMap: Map<string, ResData>;// = new Map<string, ResData>();
    private static firstResList: string[] = [];
    private static frameResList: string[] = [];

    /**添加资源 */
    public static AddRes(map: Map<string, ResData>) {
        this.resConfigMap = map;
        this.resConfigMap.forEach((item) => {
            if (item.loadType == ResLoadType.First) {
                this.firstResList.push(item.resName);
            } else if (item.loadType == ResLoadType.Frame) {
                this.frameResList.push(item.resName);
            }
        });
    }
    /**获取资源列表 */
    public static get ResConfigMap() {
        return ResMap.resConfigMap;
    }

    /**优先需要加载的资源 */
    public static get FirstResList() {
        return ResMap.firstResList;
    }

    /**分帧加载的资源 */
    public static get FrameResList() {
        return ResMap.frameResList;
    }

    /**长度 */
    public static size() {
        return ResMap.resConfigMap.size;
    }
}


import {SidebarConfig4Multiple} from "vuepress/config";

import roadmapSideBar from "./sidebars/roadmapSideBar";
import universityStudiesSideBar from "./sidebars/universityStudiesSideBar"
import knowledgeYupiSideBar from "./sidebars/knowledgeYupiSideBar";

// @ts-ignore
export default {
    "/学习路线/": roadmapSideBar,
    "/大学学习资料/": universityStudiesSideBar,
    "/知识碎片/": knowledgeYupiSideBar,

    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;

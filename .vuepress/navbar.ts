import {NavItem} from "vuepress/config";

export default [
    {
        text: "学习路线",
        link: '/学习路线/'
    },
    {
        text: "大学学习资料",
        link: '/大学学习资料/',
        items: [
            {
                text: "虚拟化", link: "/大学学习资料/#虚拟化",
            },
            {
                text: "云计算", link: "/大学学习资料/#云计算",
            },

        ]

    },

] as NavItem[];

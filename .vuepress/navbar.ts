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
                text: "云计算&桌面云", link: "/大学学习资料/#云计算-桌面云",
            },
            {
                text: "面向对象编程", link: "/大学学习资料/#面向对象编程",
            },
            {
                text: "数据存储", link: "/大学学习资料/#数据存储",
            },
            {
                text: "期末试题解析", link: "/大学学习资料/#期末试题解析",
            },

        ]

    },
    {
        text: "华为",
        link: '/华为/',
        items: [
            {
                text: "云计算", link: "/华为/#云计算",
            },
            {
                text: "云服务", link: "/华为/#云服务",
            },
            {
                text: "大数据", link: "/华为/#大数据",
            },
            {
                text: "人工智能", link: "/华为/#人工智能",
            },
        ]
    },
    {
        text: "知识碎片",
        link: '/知识碎片/'
    },
    {
        text: "作者",
        link: '/作者/',
    },
    {
        text: "关于本站",
        link: '/关于本站/#前端推荐官网.md',
    }

] as NavItem[];

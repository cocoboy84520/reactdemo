const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home',
    }, {
        title: '日程表',
        key: '/calendar',
        icon: 'ordered-list',
    }, {
        title: '设施预约',
        key: '/facilities',
        icon: 'table',
    }, {
        title: '通知公告',
        key: '/notice',
        icon: 'sound',
    }, {
        title: '共享文件',
        key: '/file',
        icon: 'file',
    }, {
        title: '流程审批',
        key: '/flow',
        icon: 'usergroup-delete',
        children: [{
            title: '新建申请',
            key: '/newflow',
            icon: 'plus-circle'
        }, {
            title: '我的申请',
            key: '/myflow',
            icon: 'key'
        },
            {
                title: '待我审批',
                key: '/mycheck',
                icon: 'key'
            },
            {
            title: '流程管理',
            key: '/flowadmin',
            icon: 'key'
        }
        ]
    }, {
        title: '常用工具',
        key: '/tool',
        icon: 'tool',
        children: [{
            title: '快递查询',
            key: '/express',
            icon: 'car'
        }, {
            title: '内部通讯录',
            key: '/book',
            icon: 'facebook'
        }
        ]
    },
    {
        title: '系统配置',
        key: '/system',
        icon: 'setting',
        children: [{
            title: '用户管理',
            key: '/user',
            icon: 'user'
        }
        ]
    },

]

export default menuList

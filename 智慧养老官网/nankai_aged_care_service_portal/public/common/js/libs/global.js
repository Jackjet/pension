/**
 * Created by 关宁 on 2019.5.5
 */

var iD = {
    index: function () {
        return {
            // 主轮播图
            Bannerid: '695318ff59bd43228c2377eff46131dd',
            // 推荐最新公告
            zxgg: '507eb3a41bcd444599af1206d66c57a0',
            // 推荐新闻资讯
            xwzx: '68fd4fd5b37346f68638abf48f85dc35',
            // 推荐行业动态
            hydt: '5524a1e321974d5798324355c71920e9',
            
            // 栏目ID
            column: {
                zxgg: 'zxgg_0000', // 最新公告
                xwzx: 'xwzx_0000', // 新闻资讯
                hydt: 'hydt_0000', // 行业动态 
            }
        }
    },

    // 首页一级导航下热门政策
    Module: function () {
        return {
            HotID: '13d246ac08f144e6b4d1d70bce804a85'
        }
    },

    // 京翼园区
    Park: {
        index: '0000',
        park: 'd1cbd878087d426280badae09f7f53f8'
    },

    enterprise: {
        Banner: '5a8390b4514349daa2a536a81ef0f889'
    },

    training: {
        // Banner: 'e6d0f8b9334b48698ee59116848bdb73'
        Banner: 'c559d6b0ac7b4e6b881f3a2e0dbd8895'    //生产环境
    },

    applocation: {
        Banner: 'a2be64b7c2ab48abae2c585d732f1ea8'
    },

    // 政策解读模块相关ID
    policy: function () {
        return {
            new: '6936375b3e4244ccaa7cb367b2c00205',
            countries: 'a5aadf0fa12046c695c4edf9b01b4213',
            cities: '1d84b004e7974a759756225ec9ccbf09',
            Int: '2f71804de7b94ead9eeb6d184d3b96a4',

            column: {
                new: 'zxzc_0000',
                guojia: 'gjzc_0000',
                shengshi: 'sszc_0000',
                jiedu: 'zcjd_0000'
            }
        }
    },

    // 企业上云模块相关ID
    enterprise: function () {
        return {
            childBanner: '84b5e0cc1333431e86c6a5165d28136f',
            latest: '6fd770ec4595473ab4a059ee303ac6c1',
            cases: '72f367db9dcd4c3f83ba5501d83ed99a',

            column: {
                dynamic: 'zxdt_0000',
                dxal: 'dxal_0000',
            }
        }
    },

    // 京翼互动模块相关ID
    beiJing: function () {
        return {
            Bannerid: 'b49f9167cb8b4d45b3145b798aa81316',
            new: '5e2ca312280d47c584e83fe5cfe966da',
            edge: '93e3fa43bcbb44ac8fa7d85c9b6b713c',

            column: {
                zxzx: 'zxzx_jjhd',
                qykj: 'qykj_jjhd'
            }
        }
    },

    // 企业应用 热门推荐ID
    Hot: function () {
        return {
            rmth:'rmtj_001'      
        }
    },

    // 城市窗口下级相关配置ID
    array: function () {
        return [{
            name: 'lunan',
            id: '8931a5a181a14de6b65f3a82edf6fa50',
            newiD: '02ba61015b4647748a5a7c0dc8babcfe',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'e17c618e34564571b599e40eb656c935',
            hot: '13d246ac08f144e6b4d1d70bce804a85'
        },
        {
            name: 'lubei',
            id: 'a2ec6f6ad5dd4bef99c6fd9e339a4d00',
            newiD: '28c9f59449c042ac89cea83b53503f2c',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '7514bd89ac1140658a4edb6717c8ae40',
            hot: ''
        },
        {
            name: 'kaiping',
            id: 'f1280ca4a59c485bb442af3c3c837d5f',
            newiD: '8e62b51a9cdd4c31a0dc54571152eb3a',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '0128e37d5c4f4610acf090efc022b98d',
            hot: ''
        },
        {
            name: 'guzhi',
            id: 'dd1d059ba61d4ed9816042d2b3e2a5f0',
            newiD: '0ce0d0d4c7884580bb197cdfed045a8f',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'bb145d9249c34847b08877f371923729',
            hot: ''
        },
        {
            name: 'fengrun',
            id: 'ff126dee0eeb466294ae0f4af7731c63',
            newiD: '3c3727ae14874872a08f5bcf4dcacf78',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '5cffdebce3a3420298328b8e6b12e1ac',
            hot: ''
        },
        {
            name: 'fengnan',
            id: '35fb608e0629435984a251a6d253716f',
            newiD: '7892aab3c06344f8a62246a220281e0d',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '62a1e1aca4334b1ebf21fbb6d97d3228',
            hot: ''
        },
        {
            name: 'caofei',
            id: 'c42040f7ae1648279aca7795a121a0d3',
            newiD: '1598b10b9f0546b6a460bd4d9f0df375',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '04e4f9ebca5b4c139614cd6abedb5ac0',
            hot: ''
        },
        {
            name: 'haigang',
            id: '84e136b6dd4a4f968396157e4a508eca',
            newiD: '1161d1e6376b49a39712b555150457e7',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '758ad4182bb64518b4550c408d6ddec1',
            hot: ''
        },
        {
            name: 'gaoxin',
            id: 'c485043c7269424db9fc3c557dd9078a',
            newiD: 'f45f29cc590d4f7ea00cc1bacef6994a',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'a0e1952a0a4d4a68aaf0f76b5bdf7861',
            hot: ''
        },
        {
            name: 'lutai',
            id: '9bb555a1b25746538b40e46322a77afb',
            newiD: '25b0c1fe0b844dd2858693a427f10b47',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '72b1340951934f10994ebc8e411906fb',
            hot: ''
        },
        {
            name: 'hangu',
            id: '4b66ab9369ec471f8b8699344b1b380a',
            newiD: '060d90dffb1146f7b9e9a0ee6c746953',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '5064422216374989895666c689b00272',
            hot: ''
        },
        {
            name: 'yutian',
            id: '0ee822e60ce3452096270fde91e25f48',
            newiD: '9360cd324b584023a31fc466cf9cfd80',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'a8ca7afdd571439c9cf8e3d813de962b',
            hot: ''
        },
        {
            name: 'qianxi',
            id: '383341d42073495ea0058c8eddedbcf0',
            newiD: 'e62c37ae2af843a0a3ef8c5fa5137830',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'a89bb6c549c949e3a4ac8ad1b0d3b760',
            hot: ''
        },
        {
            name: 'luannan',
            id: '38842b4e74ef47ab831c65831bdf3ce4',
            newiD: '05ed82b93c3e4a248b1c0ae43cbb2d0c',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '70fa2e6c4646433b978b8818ed4b72ab',
            hot: ''
        },
        {
            name: 'leting',
            id: 'fec53f38df2e48b7839bae6e887fd6c5',
            newiD: '1f9abbeca89b4174894c26ae62e1627b',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '89f0d7951e54413cbee7971adefe3763',
            hot: ''
        },
        {
            name: 'zuenhua',
            id: '2dfafb0b19bb4b1bbad7260478d3d08f',
            newiD: 'a657a158db804ad892cc3e897c1edb87',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '6eefa59c4c3e4336939da75b1e17f6e2',
            hot: ''
        },
        {
            name: 'luanzhou',
            id: 'a075a2906eef4ee6baf70761c80e483a',
            newiD: '76ae9ff69801427dadf5e599932c9855',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: '0a68e8828fca4f2ab2510b7046359e61',
            hot: ''
        },
        {
            name: 'qianan',
            id: 'ced1b12eb85c48149db62db672e74150',
            newiD: '77ca6f31b56247ca9c4fe2b282d61cd1',
            PolicyiD: '2f71804de7b94ead9eeb6d184d3b96a4',
            Industry: 'c7488b44a88e4fe9857914633e600844',
            hot: ''
        }];
    },

    parameter: function () {
        return [{
            name: 'lunan',
            param: 'lnq',
            value: '路南区'
        },
        {
            name: 'lubei',
            param: 'lbq',
            value: '路北区'
        },
        {
            name: 'kaiping',
            param: 'kpq',
            value: '开平区'
        },
        {
            name: 'guzhi',
            param: 'gyq',
            value: '古冶区'
        },
        {
            name: 'fengrun',
            param: 'frq',
            value: '丰润区'
        },
        {
            name: 'fengnan',
            param: 'fnq',
            value: '丰南区'
        },
        {
            name: 'caofei',
            param: 'cfdq',
            value: '曹妃甸区'
        },
        {
            name: 'haigang',
            param: 'hgq',
            value: '海港区'
        },
        {
            name: 'gaoxin',
            param: 'gxq',
            value: '高新区'
        },
        {
            name: 'lutai',
            param: 'ltq',
            value: '芦台区'
        },
        {
            name: 'hangu',
            param: 'hangq',
            value: '汉沽区'
        },
        {
            name: 'yutian',
            param: 'ytx',
            value: '玉田县'
        },
        {
            name: 'qianxi',
            param: 'qxx',
            value: '迁西县'
        },
        {
            name: 'luannan',
            param: 'lnx',
            value: '滦南县'
        },
        {
            name: 'leting',
            param: 'ltx',
            value: '乐亭县'
        },
        {
            name: 'zuenhua',
            param: 'zhs',
            value: '遵化市'
        },
        {
            name: 'luanzhou',
            param: 'lzs',
            value: '滦州市'
        },
        {
            name: 'qianan',
            param: 'qas',
            value: '迁安市'
        }]
    }
}
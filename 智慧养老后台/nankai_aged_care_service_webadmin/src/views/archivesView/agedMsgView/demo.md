 /#########   测试数据    ######### /
    
      /**
       * @id 标识
       * @label 名字
       * @type 文件字段
       * @iconArr 主要数据
       * @multiple 是否可以选择多张图片
       * @isOwnFlag 显示隐藏
       * @remark 备注
       */
      uploudFormArr: [
        {
          id: 0,
          label: '1.申请表',
          type: 'application',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 1,
          label: '2.承诺书',
          type: 'promise',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 2,
          label: '3.评估表',
          type: 'assess',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 3,
          label: '4.本人身份证复印件',
          type: 'idCard',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: ''
        },
        {
          id: 4,
          label: '5.本人户口本资料',
          type: 'userHomeExtends0',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张 （备注：包括 本人户口本首页、本人户口页、户口本其他人复印件）'
        },
        {
          id: 5,
          label: '6.本人银行流水凭证',
          type: 'bankImg',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: true,
          remark: '请上传低收入救助证（备注：与“本人银行流水”选择项有关）'
        },
        {
          id: 6,
          label: '7.是否本人办理',
          type: 'isOwn',
          iconArr: [],
          multiple: false,
          isOwnFlag: true,
          remark: '选择是时，展示代办人身份证复印件及代办人分户口本复印件，选择否时，不展示。'
        },
        {
          id: 7,
          label: '代办人身份证复印件',
          type: 'otherCard',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: false,
          isOwnFlag: false,
          remark: '要求：身份证复印件正反面一张照片'
        },
        {
          id: 8,
          label: '代办人户口本复印件',
          type: 'userHomeExtends1',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: false,
          remark: '支持多张'
        },
        {
          id: 9,
          label: '8.赡养费材料',
          type: 'userHomeExtends2',
          iconArr: [
            {
              icon: '1585662540453.jpg',
              iconAll: 'http://47.105.140.86/nankai/storage/1585662540453.jpg'
            },
            {
              icon: '1585662540453.jpg',
              iconAll: '1585662540453.jpg'
            }
          ],
          multiple: true,
          isOwnFlag: true,
          remark: '支持多张（备注：请上传 其他子女户口本复印件、其他子女银行流水、减免或免除赡养费）'
        }
      ],
      infoForm: {
        // 模块一
        idCard: '235407195106112745',
        name: 'c测试',
        phone: '14740550189',
        type: '1',
        age: '81',
        birthday: '1990-02-02',
        genreId: [],
        linkName: '侧手',
        linkPhone: '14740550189',
        sex: '1',
        icon: 'http://47.105.140.86/nankai/storage/1585662540453.jpg',
        national: '',
        homeAreaName: '天津南开',
        homeStreetId: '',
        homeCommunityId: '',
        homeAddress: '沈阳市沈阳市沈阳市沈阳市',
        registerAddress: '沈阳市',
        // 模块二
        marryId: '',
        educationId: '',
        political: '',
        liveId: '',
        economicId: '',
        height: '10.00',
        weight: '20.000',
        hearId: '',
        visionId: '',
        illId: '',
        mentallyId: '',
        allergySource: '',
        drug: '',
        bodyId: '',
        mentalId: '',
        specialtyId: '',
        demand: '',
        cardCode: '',
        receiveId: '',
        // 亲属信息
        userRelatives: [],
        // 模块三
        userHome: {
          application: '',
          promise: '',
          assess: '',
          idCard: '',
          bank: '',
          bankImg: '',
          isOwn: '0',
          otherCard: '',
          userHomeExtends0: [{
            extendInfo: '',
            extendType: 0
          }],
          userHomeExtends1: [{
            extendInfo: '',
            extendType: 1
          }],
          userHomeExtends2: [{
            extendInfo: '',
            extendType: 2
          }],
          alimony: '2000',
          bank1: '3000'
        },
        alimony: '20.00',
        bank1: '30.00',
        assessInfo: '1',
        assessLevel: '2',
        assessMoney: '10.00'
      },
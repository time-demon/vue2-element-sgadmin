<template >
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="ruleForm" v-loading="loading" :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="权限字符" prop="ident">
                <el-input v-model="ruleForm.ident" placeholder="如：user1、user2"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="menuTreeData">
                <el-tree node-key="fullPath" :data="menuTreeData" :props="props" show-checkbox ref="tree"></el-tree>
            </el-form-item>
            <el-form-item label="状态" prop="state">
                <el-switch v-model="ruleForm.state"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-loading="loading">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import dateTime from '@/tools/dateTime';
export default {
    data() {
        return {
            loading: false,
            dialogFormVisible: false,
            ruleForm: {},
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                ident: [
                    { required: true, message: '请输入权限字符', trigger: 'change' }
                ],
            },
            props: {
                label: 'title',
                children: 'children'
            },
            count: 1,
            menuTreeData: [],
        }
    },
    mounted() {
        // 初始化表单数据 
        this.rolePopupReset();

        let routes = this.$router.options.routes[0].children;
        // 递归实现自定义数据
        // 遍历一级导航
        for (let i = 0; i < routes.length; i++) {
            this.menuTreeData.push({ fullPath: '/' + routes[i].path, title: routes[i].meta.title })
            // 如果一级导航里有二级导航
            if (routes[i].children != undefined) {
                this.menuTreeData[i].children = [];
                // 遍历二级导航
                for (let j = 0; j < routes[i].children.length; j++) {
                    this.menuTreeData[i].children.push({ fullPath: '/' + routes[i].path + '/' + routes[i].children[j].path, title: routes[i].children[j].meta.title });
                    // 如果二级导航里有三级导航
                    if (routes[i].children[j].children != undefined) {
                        this.menuTreeData[i].children[j].children = [];
                        // 遍历三级导航
                        for (let k = 0; k < routes[i].children[j].children.length; k++) {
                            this.menuTreeData[i].children[j].children.push({ fullPath: '/' + routes[i].path + '/' + routes[i].children[j].path + '/' + routes[i].children[j].children[k].path, title: routes[i].children[j].children[k].meta.title })
                        }
                    }
                }
            };
        };
    },
    methods: {

        // 弹窗表单数据重载,可传入自定义数据
        rolePopupReset(data) {
            if (data == undefined) {
                this.ruleForm = {
                    name: '',// 名称
                    ident: '',// 字符
                    state: true,// 状态
                    remark: '',// 备注
                    menuTreeData: [],// 菜单权限树的数据
                };
            } else {
                this.ruleForm = data;
            }
        },

        // 打开添加角色弹窗表单
        openRoleAdd() {
            this.dialogFormVisible = true;
            this.rolePopupReset();
        },

        // 打开修改角色弹窗表单
        openRoleChange(row) {
            console.log(row.menuTreeData);
            for (let i = 0; i < row.menuTreeData.length; i++) {
                console.log(row.menuTreeData[i].split('/'));
            }

            this.rolePopupReset(row);
            this.dialogFormVisible = true;
        },

        // 提交
        submitForm(formName) {
            let _this = this;
            _this.loading = true;
            // 循环添加菜单权限到ruleForm数据中
            for (let i = 0; i < this.$refs.tree.getCheckedNodes(false, true).length; i++) {
                this.ruleForm.menuTreeData.push(this.$refs.tree.getCheckedNodes(false, true)[i].fullPath);
            };
            _this.ruleForm.addTime = dateTime().time;// 添加时间
            this.$refs[formName].validate((valid) => {
                console.log(233);
                this.$network({
                    method: "POST",
                    url: '/api/rolesAdd',
                    data: _this.ruleForm
                }).then(res => {
                    console.log(2);
                    console.log(res.code);
                    if (res.code == 200) {
                        _this.dialogFormVisible = false;
                        this.$message({
                            message: '成功添加',
                            type: 'success'
                        });
                        _this.$parent.tableDataGet()
                    } else if (res.code == -2) {
                        console.log(222);
                        this.$message({
                            message: '已有该角色',
                            type: 'error'
                        });
                    }
                    _this.loading = false;
                })
            });
        }

    },
}
</script>
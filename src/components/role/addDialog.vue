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
            <el-form-item label="菜单权限" prop="treeData">
                <el-tree node-key="fullPath" :data="treeData" :props="props" show-checkbox ref="tree"></el-tree>
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
                // name: [
                //     { required: true, message: '请输入角色名称', trigger: 'blur' },
                // ],
                // ident: [
                //     { required: true, message: '请输入权限字符', trigger: 'change' }
                // ],
            },
            props: {
                label: 'title',
                children: 'children'
            },
            count: 1,
            treeData: [],
        }
    },
    mounted() {
        this.rolePopupReset();
        let routes = this.$router.options.routes[0].children;
        console.log(1, routes);
        console.log(2, this.$store.state.rolesRoutes);
        // 遍历一级导航
        for (let i = 0; i < routes.length; i++) {
            this.treeData.push({ fullPath: '/' + routes[i].path, title: routes[i].meta.title })
            // 如果一级导航里有二级导航
            if (routes[i].children != undefined) {
                this.treeData[i].children = [];
                // 遍历二级导航
                for (let j = 0; j < routes[i].children.length; j++) {
                    this.treeData[i].children.push({ fullPath: '/' + routes[i].path + '/' + routes[i].children[j].path, title: routes[i].children[j].meta.title });
                    // 如果二级导航里有三级导航
                    if (routes[i].children[j].children != undefined) {
                        this.treeData[i].children[j].children = [];
                        // 遍历三级导航
                        for (let k = 0; k < routes[i].children[j].children.length; k++) {
                            this.treeData[i].children[j].children.push({ fullPath: '/' + routes[i].path + '/' + routes[i].children[j].path + '/' + routes[i].children[j].children[k].path, title: routes[i].children[j].children[k].meta.title })
                        }
                    }
                }
            };
        };
    },
    methods: {

        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },

        // 角色添加和修改弹窗表单重载
        rolePopupReset(type) {
            if (type == undefined) {
                this.ruleForm = {
                    name: '',
                    ident: '',
                    state: true,
                    remark: '',
                    treeData: [],
                };
            } else {
                this.ruleForm = type;
            }
        },

        // 打开添加角色弹窗表单
        openRoleAdd() {
            this.dialogFormVisible = true;
            this.rolePopupReset();
        },

        // 打开修改角色弹窗表单
        openRoleChange(row) {
            console.log(row.treeData);
            for (let i = 0; i < row.treeData.length; i++) {
                console.log(row.treeData[i].split('/'));
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
                this.ruleForm.treeData.push(this.$refs.tree.getCheckedNodes(false, true)[i].fullPath);
            };
            _this.ruleForm.addTime = dateTime().time;// 添加时间
            this.$refs[formName].validate((valid) => {
                this.$network({
                    method: "POST",
                    url: '/api/rolesAdd',
                    data: _this.ruleForm
                }).then(res => {
                    if (res.code == 200) {
                        _this.loading = false;
                        _this.dialogFormVisible = false;
                        this.$message({
                            message: '成功添加',
                            type: 'success'
                        });
                        _this.$parent.tableDataGet()
                    }
                })
            });
        }

    },
}
</script>
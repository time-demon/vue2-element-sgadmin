<template>
    <div>
        <div class="pageTools_container">
            <el-button type="primary" plain size="small" icon="el-icon-plus" @click="openRoleAdd()">添加角色</el-button>
        </div>
        <cardVue :title="''" :titleShow="false" shadow="nerver">
            <template v-slot:aa>
                <el-table :data="tableData" border style="width: 100%" v-loading="loading" stripe>
                    <el-table-column fixed prop="addTime(addTime)" label="添加时间" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ addTime(scope.row.addTime)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="角色名称" width="120">
                    </el-table-column>
                    <el-table-column prop="ident" label="权限字符" width="120">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="openRoleChange(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </cardVue>
        <addDialog ref="addDialog" />
    </div>
</template>

<script>
import cardVue from '@/components/default/card.vue';
import addDialog from '@/components/role/addDialog.vue'
import dateTime from '@/tools/dateTime';
export default {
    components: {
        cardVue, addDialog
    },
    data() {
        return {
            loading: true,
            tableData: [],
        }
    },
    mounted() {
        this.tableDataGet();
    },
    methods: {
        // 时间转换
        addTime(addTime) {
            return dateTime('parse', addTime).fullTime
        },

        tableDataGet() {
            this.loading = true;
            this.$network({
                url: '/api/rolesGet'
            }).then(res => {
                this.tableData = res.data;
                this.loading = false;
            })
        },

        // 打开添加角色弹窗表单
        openRoleAdd() {
            this.$refs.addDialog.openRoleAdd();
        },

        // 打开修改角色弹窗表单
        openRoleChange(row) {
            this.$refs.addDialog.openRoleChange(row);
        },

        handleClick(row) {
            console.log(row);
        },

    },
}
</script>

<style lang="scss" scoped>
.pageTools_container {
    padding: 20px 0;
}
</style>
<template>
    <div>
        <div class="pageTools_container">
            <el-button type="primary" plain size="small" icon="el-icon-plus" @click="openRoleAdd()">添加角色</el-button>
        </div>
        <tableCard :title="''" :titleShow="false" shadow="nerver" padding="0">
            <template v-slot:aa>
                <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe ref="tabelForm">
                    <el-table-column type="selection" width="55" :selectable="selectDisableRoom">
                    </el-table-column>
                    <el-table-column prop="name" label="角色名称" width="120">
                    </el-table-column>
                    <el-table-column prop="ident" label="权限字符" width="120">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" width="120">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
                                @change="changeState({_id:scope.row._id,state:scope.row.state})">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="addTime(addTime)" label="添加时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ addTime(scope.row.addTime)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope" v-if="scope.row.ident != 'admin'">
                            <el-button @click="openRoleChange(scope.row)" type="text" size="small">修改</el-button>
                            <el-button @click="openRoleChange(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </tableCard>
        <addDialog ref="addDialog" />
    </div>
</template>

<script>
import tableCard from '@/components/default/tableCard.vue';
import addDialog from '@/components/role/addDialog.vue'
import dateTime from '@/tools/dateTime';
export default {
    components: {
        tableCard, addDialog
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

        // 设置不能勾选的
        selectDisableRoom(row, index) {
            if (row.ident != 'admin') {
                return true
            }
        },

        // 表格重载
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
            this.$refs.addDialog.openPopup('add');
        },

        // 打开修改角色弹窗表单
        openRoleChange(row) {
            this.$refs.addDialog.openPopup('up', row);
        },

        // 修改状态
        changeState(data) {
            this.tableDataGet();
            this.$network({
                method: 'post',
                url: '/api/rolesUp',
                data: data
            }).then(res => {
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.pageTools_container {
    padding: 20px 0;
}
</style>
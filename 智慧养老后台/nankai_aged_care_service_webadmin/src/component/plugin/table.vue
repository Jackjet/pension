<template>
  <el-main>
    <el-col :span="24">
      <el-form :inline="true" class="el-InputForm" v-if="tableForm.search">
        <template v-for="(index, item) in tableForm.search">
          <el-form-item :key="item" v-if="index.type === 'input'">
            <el-input
              clearable
              size="medium"
              :placeholder="index.placeholder"
              prefix-icon="el-icon-search"
              v-model="paramForm[index.model]"
            >
            </el-input>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'number'">
            <el-input
              clearable
              size="medium"
              :min="0"
              onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
              :placeholder="index.placeholder"
              ondragenter="return false"
              @keydown.native="channelInputLimit"
              prefix-icon="el-icon-search"
              v-model.number="paramForm[index.model]"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="section"
            :key="item"
            v-if="index.type === 'section'"
          >
            <el-col :span="11" class="price">
              <el-input
                size="medium"
                type="input"
                class="price"
                onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                :min="0"
                @keydown.native="channelInputLimit"
                :placeholder="index.placeholderStart"
                v-model.number="section[0]"
              >
              </el-input>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11" class="price">
              <el-input
                size="medium"
                type="input"
                class="price"
                onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                @keydown.native="channelInputLimit"
                :min="0"
                :placeholder="index.placeholderEnd"
                v-model.number="section[1]"
              >
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'time'">
            <el-time-select
              clearable
              size="medium"
              class="time"
              unlink-panels
              v-model="paramForm[index.model]"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
              }"
              :placeholder="index.placeholder"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'timerange'">
            <el-time-picker
              clearable
              size="medium"
              is-range
              class="time"
              :popper-append-to-body="false"
              v-model="paramForm[index.model]"
              range-separator="???"
              value-format="HH:mm:ss"
              :start-placeholder="index.placeholderStart"
              :end-placeholder="index.placeholderEnd"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'date'">
            <el-date-picker
              clearable
              size="medium"
              unlink-panels
              class="time"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="index.placeholder"
              v-model="paramForm[index.model]"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'daterange'">
            <el-date-picker
              clearable
              size="medium"
              unlink-panels
              class="daterange"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="???"
              :start-placeholder="index.placeholderStart"
              :end-placeholder="index.placeholderEnd"
              v-model="paramForm[index.model]"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'datetime'">
            <el-date-picker
              clearable
              size="medium"
              unlink-panels
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="index.placeholder"
              v-model="paramForm[index.model]"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'datetimerange'">
            <el-date-picker
              clearable
              size="medium"
              unlink-panels
              class="daterange"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="???"
              :start-placeholder="index.placeholderStart"
              :end-placeholder="index.placeholderEnd"
              v-model="paramForm[index.model]"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'cascader'">
            <el-cascader
              clearable
              size="medium"
              class="el-forms"
              :options="options"
              v-model="paramForm[index.model]"
              :placeholder="item.placeholder"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item :key="item" v-if="index.type === 'select'">
            <el-select
              :placeholder="index.placeholder"
              :popper-append-to-body="false"
              v-model="paramForm[index.model]"
              clearable
              filterable
              :multiple="index.multiple"
              :allow-create="index.multiple"
              :default-first-option="index.multiple"
              size="medium"
            >
              <el-option
                v-for="(dates, index) in index.option"
                :disabled="dates.disabled"
                :label="dates.label"
                :value="dates.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item v-if="tableForm.search.length > 0">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-search"
            @click="submitQuery()"
            >??????</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" style="text-align: left; padding: 0 2px">
      <template v-for="(item, index) in tableForm.item">
        <el-button
          :key="index"
          type="primary"
          icon="el-icon-plus"
          plain
          size="mini"
          v-if="item === 'new' || item.type === 'new'"
          @click.native.prevent="item.method !== undefined ? item.method() : ''"
          >??????</el-button
        >
        <el-button
          :key="index"
          type="primary"
          icon="el-icon-delete"
          plain
          size="mini"
          v-if="item === 'delete' || item.type === 'delete'"
          @click.native.prevent="
            item.method !== undefined ? item.method(deleteList) : ''
          "
          >????????????</el-button
        >
        <el-button
          :key="index"
          type="primary"
          icon="el-icon-document-copy"
          plain
          size="mini"
          v-if="item === 'import' || item.type === 'import'"
          @click.native.prevent="item.method !== undefined ? item.method() : ''"
          >????????????</el-button
        >
        <el-button
          :key="index"
          type="primary"
          icon="el-icon-folder-opened"
          plain
          size="mini"
          v-if="item === 'export' || item.type === 'export'"
          @click.native.prevent="item.method !== undefined ? item.method() : ''"
          >????????????</el-button
        >
      </template>
    </el-col>
    <el-col :span="24" v-if="tableForm.tab && tableForm.list">
      <el-table :data="tableForm.list.data" v-loading="false">
        <template v-for="(item, index) in tableForm.list.header">
          <el-table-column :key="index" :label="item.label" :prop="item.field">
            <template slot-scope="scope">
              {{ scope.row[item.field] }}
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-col>
    <el-col :span="24" v-else-if="tableForm.list">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        element-loading-text="???????????????"
        :data="tableForm.list.data"
        :border="tableForm.list.border"
        empty-text="????????????"
        class="el_tab_alage"
        :default-sort="{
          order: 'descending',
        }"
        :cell-style="
          tableForm.list.styleMethod !== undefined
            ? tableForm.list.styleMethod.method
            : cellStyle
        "
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandSelect"
        @selection-change="handleSelectionChange"
        @select="handleSelect"
      >
        <el-table-column
          align="center"
          width="50"
          label=""
          v-if="tableForm.list.type === 'radio'"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.$index"
              v-model="radio"
              @change="handleTemplateRow(scope.$index, scope.row)"
              >&nbsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          label="??????"
          type="index"
          width="50"
          align="center"
          v-if="tableForm.list.type === 'index'"
        ></el-table-column>
        <el-table-column
          type="selection"
          :selectable="selectInit"
          :reserve-selection="true"
          width="50"
          align="center"
          v-if="tableForm.list.type === 'checkbox'"
        ></el-table-column>
        <el-table-column type="expand" v-if="tableForm.list.detaile">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item
                :label="indexs.label"
                v-for="(indexs, items) in tableForm.list.header"
                :key="items"
                v-show="indexs.expand"
              >
                <span>{{ scope.row[indexs.field] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <template v-for="(index, item) in tableForm.list.header">
          <el-table-column
            fit
            align="center"
            :key="item"
            :sortable="index.sort"
            v-if="!index.expand"
            :label="index.label"
            :width="index.width"
            :prop="index.field"
          >
            <template slot-scope="scope">
              <template v-if="index.type === 'image'">
                <el-image
                  style="width: 100px; height: 50px"
                  :preview-src-list="[scope.row[index.field]]"
                  :src="scope.row[index.field]"
                >
                </el-image>
              </template>
              <template v-else-if="index.type === 'time'">
                <i class="el-icon-time"></i>
                {{ scope.row[index.field] }}
              </template>
              <template v-else-if="index.type === 'checked'">
                <el-checkbox
                  v-model="scope.row[index.field]"
                  @change="changeCheckbox(item, scope.row[index.field])"
                ></el-checkbox>
              </template>
              <template v-else-if="index.type === 'isClick'">
                <span
                  style="cursor: pointer"
                  @click="phoneClick(scope.row[index.field])"
                  >{{ scope.row[index.field] }}</span
                >
              </template>
              <template v-else-if="index.type === 'operation'">
                <el-button
                  v-for="(item, index) in scope.row[index.field]"
                  type="text"
                  :icon="item.icon"
                  :key="index"
                  @click.native.prevent="
                    operationClick(scope.row, scope, item.click)
                  "
                  >{{ item.label }}
                </el-button>
              </template>
              <template v-else>
                {{ scope.row[index.field] }}
              </template>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          fit
          align="center"
          :label="tableForm.list.operation.label"
          v-if="tableForm.list.operation"
          :width="tableForm.list.operation.width"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(value, item) in tableForm.list.operation.event"
              type="text"
              :icon="value.icon"
              :key="item"
              @click.native.prevent="
                value.method !== undefined ? value.method(scope.row, scope) : ''
              "
              >{{ value.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" v-if="tableForm.paging">
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableForm.paging.currentPage"
          :page-sizes="pageSizes"
          :page-size="tableForm.paging.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableForm.paging.total"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-main>
</template>

<script>
import area from "js/area";

export default {
  props: {
    tableForm: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      // ????????????????????????
      paramForm: {},
      // ???????????? ?????????????????????
      loading: true,
      // ?????????
      isSelection: false,
      // ???????????????????????????
      deleteList: "",
      // ????????????????????????
      radio: "1",
      // ??????????????? ?????????????????????
      expands: [],
      // ??????????????????????????????
      pageSizes: [10, 20, 50, 100],
      /**
       * ?????????????????????????????????
       * @param page  ????????????
       * @param limit ?????????
       */
      page: {
        page: "",
        limit: "",
      },
      // ????????????????????????
      section: [],
      // ??????????????????????????? ????????????
      options: area,
    };
  },

  mounted() {
    const table = this.tableForm;
    // ????????????????????????
    const models = table.search || [];

    // ?????????????????? ????????????
    const mapChange = () => {
      let newObj = {};
      for (let item of models.values()) {
        newObj[item.model] = "";
      }
      return newObj;
    };

    this.paramForm = mapChange();

    // ????????????????????????
    const checkbox = table.item || [];

    checkbox.forEach((element) => {
      // ???????????????????????? ?????????????????????
      if (element === "delete" || element.type === "delete") {
        this.isSelection = true;
      }
    });

    // ???????????????????????????????????? ????????????????????????
    if (table.paging) {
      this.page.page = table.paging.currentPage;
      this.page.limit = table.paging.limit;
    }

    /**
     * ?????????????????? ??????????????? ????????????????????????????????????
     */
    for (let first of area) {
      first.value = first.label;
      // ??????????????????
      if (first.children && first.children !== []) {
        for (let level of first.children) {
          level.value = level.label;
          // ??????????????????
          if (level.children && level.children !== []) {
            for (let last of level.children) {
              last.value = last.label;
            }
          }
        }
      }
    }
  },

  methods: {
    selectInit(row, index) {
      // isDisabled???true ---> ??????
      if (row.isDisabled) {
        return false;
      } else {
        return true;
      }
    },
    operationClick(event, row, type) {
      this.$emit(type, event);
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      return "";
    },
    changeCheckbox(event, row) {
      // console.log(row);
      // console.log(event);
      this.$emit("changeCheckbox", event);
    },
    /**
     * ????????????????????????
     */
    submitQuery() {
      /**
       * ??????????????????????????????
       * ?????????????????????????????????
       */
      if (this.section[0] === "" && this.section[1] === "") {
        this.section = [];
      } else {
        this.section.map((item) => {
          return item !== "" ? item : "";
        });
      }

      for (let section of this.tableForm.search) {
        if (section.type === "section") {
          this.paramForm[section.model] = this.section;
        }
      }

      for (let [key, value] of Object.entries(this.paramForm)) {
        // ?????????????????????
        if (Array.isArray(value)) {
          let Strings = "";

          // ???????????? ?????????????????????????????? ????????????
          value.forEach((item, val) => {
            Strings += `${item},`;
            this.paramForm[key] = Strings.slice(0, Strings.length - 1);
          });
        }

        // ??????????????????????????? ???????????????????????????
        if (
          value === "" ||
          value === undefined ||
          value === null ||
          value.length === 0
        ) {
          delete this.paramForm[key];
        }
      }

      // ??????????????????????????????
      this.$emit("initial", this.paramForm);
    },
    phoneClick(row) {
      this.$emit("phoneClick", row);
    },

    /**
     * ?????????????????????????????????
     */
    handleSelectionChange(item) {
      this.deleteList = item;
      this.$emit("onHandleSelectionChange", this.deleteList);
    },

    clearSelections() {
      this.$refs.multipleTable.clearSelection();
    },

    handleSelect(val, row) {
      this.$emit("onHandleSelect", val, row);
    },

    getRowKeys(row) {
      return row.id;
    },

    /**
     * ????????????????????? ???????????? ????????????????????????
     */
    handleTemplateRow(index, row) {
      this.$emit("onHandleTemplateRow", row);
    },

    /**
     * ?????????????????? ???????????????iD
     */
    expandSelect(row, expandedRows) {
      const that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.id);
        }
      } else {
        // ???????????????????????? ??????????????????
        that.expands = [];
      }
    },

    // ????????????????????? ??????????????????????????????
    channelInputLimit(el) {
      let key = el.key;
      if (
        key === "e" ||
        key === "-" ||
        key === "." ||
        key === "+" ||
        key === "_"
      ) {
        el.returnValue = false;
        return false;
      }
    },

    /**
     * ????????????????????? ?????????????????????????????? ??????????????????
     */
    handleSizeChange(val) {
      this.page.limit = val;
      this.$emit("pageChange", this.page);

      this.loading = true;
      this.$emit("initial");
    },

    /**
     * ?????????????????? ?????????????????????????????? ??????????????????
     */
    handleCurrentChange(val) {
      this.page.page = val;
      this.$emit("pageChange", this.page);

      this.loading = true;
      this.$emit("initial");
    },

    closeDialog() {},
  },
};
</script>

<style lang="scss">
@import "scss/table.scss";
</style>

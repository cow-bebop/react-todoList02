import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import TodoCreator from "./components/TodoCreator";
import Search from "./components/Search";
import _ from "lodash";

class TodoApp extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample todo1'
        },
        {
          id: this.createHashId(),
          text: 'sample todo2'
        }
      ],
      searchText: ''
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  // 新しくタスクを追加する際にidを振る必要があるが、idを配列の順番号にしてしまうとタスクが削除された際に同じidが振られてしまうのでランダムなidにする
  createHashId(){
    // 完全に一意なキーは生成できないので注意
    // 一意なキーにしたいなら外部ライブラリを使う、あるいは作るなどの工夫が必要
    return Math.random().toString(36).slice(-16);
  }

  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }

  callBackRemoveTask(id) {
    let data = _.reject(this.state.data, {'id': id});
    this.setState({
      data: data
    });
  }

  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({ id: this.createHashId(), text: val});
    this.setState({
      data: nextData
    });
  }

  filterCollection(elm){
    // RegExpで正規表現を使える。第二引数にはiをとりあえず入れておけばOK
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {
    // 配列オブジェクトにはfilterが使え、引数に関数が使える。配列の要素それぞれにfilterの引数に入れた関数の処理を行って配列で返す
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    // 検索しても出したらdoneが外れる問題

    return (
      <div>

        <TodoCreator callBackAddTask={this.callBackAddTask} />

        <Search callBackSearch={this.callBackSearch} />
      
        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} />

      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById("app"));

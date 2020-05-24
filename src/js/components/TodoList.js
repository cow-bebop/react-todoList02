import React from "react";
import Task from "./Task";

// exportは他のファイルで読み込みたいならつける。defaultはこのファイルに他のclassがない場合にはつける。その場合、外部ファイルで読み込む場合は{}でimportする必要がなくなる
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(id) {
    this.props.callBackRemoveTask(id);
  }
  render() {
    let tasks = [];
    for (let i in this.props.data) {
      // コンポーネントをループで複数生成する場合はkeyを指定する必要がある
      // keyはReactがコンポーネントを一意に識別するためのもの
      // keyにはiかidを指定することが一般的
      tasks.push(
        <Task
          key={this.props.data[i].id}
          id={this.props.data[i].id}
          text={this.props.data[i].text}
          onRemove={this.handleRemove}
        />
      );
    }

    return (
    <ul className="list js-todo_list">{tasks}</ul>
    );
  }
}

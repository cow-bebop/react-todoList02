import React from "react";
import Task from "./Task";
import _ from "lodash";

// exportは他のファイルで読み込みたいならつける。defaultはこのファイルに他のclassがない場合にはつける。その場合、外部ファイルで読み込む場合は{}でimportする必要がなくなる
export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          text: "sample todo1"
        },
        {
          id: 1,
          text: "sample todo2"
        }
      ]
    };
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(id) {
    // for in などでループしてidをチェックしてもいいが、lodashで簡単にできる
    // let data = [];
    // for(let i in this.state.data) {
    // if(this.state.data[i].id !== id){
    //      data.push(this.state.data[i]);
    // }
    // }
    let data = _.reject(this.state.data, { id: id });
    this.setState({
      data: data
    });
  }
  render() {
    let tasks = [];
    for (let i in this.state.data) {
      tasks.push(
        <Task
          key={this.state.data[i].id}
          id={this.state.data[i].id}
          text={this.state.data[i].text}
          onRemove={this.handleRemove}
        />
      );
    }

    return <ul className="list js-todo_list">{tasks}</ul>;
  }
}

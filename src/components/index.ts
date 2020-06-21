import { define } from '../utils';
import { TodoApp } from './todo-app';
import { TodoFooter } from './todo-footer';
import { TodoHeader } from './todo-header';
import { TodoItem } from './todo-item';

define('todo-item', TodoItem);
define('todo-header', TodoHeader);
define('todo-footer', TodoFooter);
define('todo-app', TodoApp);

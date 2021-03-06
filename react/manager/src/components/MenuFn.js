// 用于处理菜单的选择部分
var fn = {};

fn._SetState = (state) => {
  store.dispatch({
    type: 'SetState',
    data: state,
  });
};

fn.UpdateState = (state) => state;

fn.TypeSelect = (state, action) => {
  var ID = action.data;
  state.activeType = ID;
  fn.getItemList(ID)
    .then((data) => {
      state.itemList = data;
      state.activeItem = (data[0] || {}).ID;
      fn._SetState(state);
    });
  return state;
};

fn.TypeRename = function (state, action) {
  var ID = action.data;
  var name = prompt('请输入新的名称', action._name);
  var discription = prompt('请输入新的备注', action._discription);
  if (name.trim().length == 0 || discription.trim().length == 0){
    return state;
  }
    
  state.typeList.map((ele) => {
    if (ele.ID == ID)
      ele.Name = name;
      ele.Discription = discription;
  });
  $.post('/api/v1/menu/type/update', { ID, ClassName: name, ClassDescription: discription })
   .then((res) => {
     if (!res.success)
       alert(`修改失败${res.data}`);
   });
  return state;
};

fn.TypeDelete = function (state, action) {
  var ID = action.data;
  // 请求数据
  $.post('/api/v1/menu/type/delete', { ID })
   .then((res) => {
     if (!res.success)
       return alert('删除失败');
    // 更新数据
     store.dispatch({ type: '@@redux/INIT' });
   });
  return state;
};

fn.TypeAdd = function (state, action) {
  var ClassName = prompt('请输入新增的类别名称', '默认名称');
  var ClassDescription = prompt('请输入新增类别的描述', '默认描述');
  $.post('/api/v1/menu/type/add', { ClassName, ClassDescription })
   .then((res) => {
     if (!res.success) {
       alert('添加不成功');
     } else {
       store.dispatch({ type: '@@redux/INIT' });
     }
   });
};

fn.SetState = function (state, action) {
  return action.data;
};

fn['@@redux/INIT'] = function (state, action) {
  fn.getTypeList()
  .then((data) => {
    state.typeList = data;
    state.activeType = data[0].ID;
    fn.getItemList(state.activeType)
      .then((data) => {
        state.itemList = data;
        state.activeItem = data[0].ID;
        store.dispatch({
          type: 'SetState',
          data: state,
        });
      });
  });
  return state;
};

fn.ItemAdd = (state, action) => {
  // 目前被选中的TypeID
  var ClassID = state.activeType;
  var Name = prompt('请输入新的菜的名称', '默认菜名');
  $.post('/api/v1/menu/dish/add', { Name, ClassID })
   .then((res) => {
     if (!res.success) {
        alert('添加失败');
      } else{
        fn.getItemList(ClassID)
          .then((items) => {
            state.itemList = items;
            state.activeItem = res.data.ID;
            fn._SetState(state);
          });
      }
   });
};

fn.ItemSelect = (state, action) => {
  var ID = action.data;
  state.activeItem = ID;
  return state;
};

fn.ItemDelete = (state, action) => {
  var ID = action.data;
  $.post('/api/v1/menu/dish/delete', { ID })
   .then((res) => {
     if (!res.success) {
       return alert('删除失败' + res.data);
     } else{
      // 获取到最新的数据
       fn.getItemList(state.activeType)
        .then((data) => {
          state.itemList = data;
          state.activeItem = data[0].ID;
          fn._SetState(state);
        });
      // 滚动到顶部
       $('.manager-end-list').animate({ scrollTop: '0px' }, 1000);
     }
   });
  return state;
};

fn.ItemUpdate = (state, action) => {
  var ID = action.data;
  var form = action.form;
  form.ID = ID;
  $.post('/api/v1/menu/dish/update', form)
   .then((res) => {
     if (!res.success)
      alert('修改失败');
   });

  $.post('/api/v1/menu/dish/updateimg', { ID, Img: action.ImgUrl })
   .then((res) => {
     if (!res.success) {
      alert('修改失败');
      console.log(res.data);
    }
   });
};


// 下面是对这个类型是获取的数据函数
fn.getTypeList = function () {
  return $.get('/api/v1/menu/type')
     .then((res) => {
       if (!res.success)
         return alert('获取数据失败，请重试');
       var data = res.data;
       for (var i in data) {
         data[i].Name = data[i].ClassName;
       }
       return data;
     });
};

fn.getItemList = function (type) {
  return $.get(`/api/v1/menu/type/${type}`)
            .then((res) => {
              if (!res.success)
                alert('获取数据失败,请重试');
              var data = res.data;
              for (var i in data) {
                data[i].Img = (data[i].Imgs[0] || {}).ImgUrl;
              }
              return data;
            });
};

fn.getItem = function (ID) {
  return $.get(`/api/v1/menu/dish/${ID}`)
            .then((res) => {
              if (!res.success)
                alert('获取数据失败，请重试');
              return res.data;
            });
};

export default fn;

import { observable, computed, action } from 'mobx';


export default class MenuStore {
    //body
     @observable  icons = [
       {name: 'home', id: 1},
       {name: 'search', id: 2},
       {name: 'rocket', id: 3}
       ];
    @observable menuClass = 'has-options';
    @observable activeMenuItem: number = 1;

    @computed get menuItems(){
        return this.icons;
    }

    @computed get activeItem(){
      return this.activeMenuItem;
    }

    @action onMenuItemClick = (menuInfo: any) => {
        if (this.menuClass === 'has-options') {
            if (this.activeMenuItem === menuInfo.id) {
                this.setMenuClass('');
                return;
            }
        }else {
             this.setMenuClass('has-options');
        }
        this.activeMenuItem = menuInfo.id;
    }

    @action setMenuClass = (mc) => {
        this.menuClass = mc;
    }

    @computed get menuType(){
        return this.menuClass;
    }

};

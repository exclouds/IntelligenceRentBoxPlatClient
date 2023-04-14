 <template>
      
        
     <el-menu-item 
     v-if="!item.hidden && compute(item) && hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow"
     :index="resolvePath(onlyOneChild.path)">  
       <router-link v-if="onlyOneChild.params"  
       :to="onlyOneChild.params" >    
      {{onlyOneChild.meta.title}}
            <!-- <item v-if="onlyOneChild.meta"  :title="onlyOneChild.meta.title" /> -->
             </router-link> 

        <router-link v-else :to="resolvePath(onlyOneChild.path)" >    
      {{onlyOneChild.meta.title}}
            <!-- <item v-if="onlyOneChild.meta"  :title="onlyOneChild.meta.title" /> -->
             </router-link> 

        </el-menu-item>
     
     
    
    <el-submenu  v-else-if="!item.hidden && compute(item)" :class="{'secondMenu':layer===2}"  ref="submenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title" >
        <item v-if="item.meta"  :title="item.meta.title" />
      </template>    
        <sidebar-item
        
          v-for="child in item.children"
          :layer="2"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" />
     
    </el-submenu>
    

  <!-- </div> -->
</template>

<script>
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    layer: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    comChild: function() {
      return this.item.children.filter(function (child) {
        return !child.hidden
      })
    }
  },
  methods: {
    compute(menuItem) {
      if(!menuItem.children)
        return true

      let length = menuItem.children.filter(item => {
        if( item.children && item.children.length ==0 )
          return true
        else
          return false
      }).length

      if(length===menuItem.children.length)
        return false

      return true
    },
    hasOneShowingChild(children=[], parent) {
      // if(!children)
      //   return false
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子路由器时，默认情况下显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    },
 
    //合并父子路由path
    resolvePath(routePath) {      
     // if(menuchild.params)
      if (this.isExternal(routePath)) {
        return routePath
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath
      }
      var pp=path.resolve(this.basePath, routePath);
      return path.resolve(this.basePath, routePath)
    },
   
    isExternalLink(routePath) {
      return this.isExternal(routePath)
  	},
    getparams(OneChild)
    {
      if(OneChild.params!==undefined)
        return OneChild.params;
       else
        return "";
    }
  }
}
</script>

import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  Calendar, 
  GitCompare, 
  CheckCircle, 
  Share, 
  BookOpen,
  Users,
  MapPin,
  GraduationCap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Master Data",
    url: "/master-data",
    icon: Database,
    children: [
      { title: "Rooms", url: "/master-data/rooms", icon: MapPin },
      { title: "Subjects", url: "/master-data/subjects", icon: BookOpen },
      { title: "Faculty", url: "/master-data/faculty", icon: Users },
      { title: "Batches", url: "/master-data/batches", icon: GraduationCap },
    ]
  },
  {
    title: "Constraints",
    url: "/constraints",
    icon: Settings,
  },
  {
    title: "Generate",
    url: "/generate",
    icon: Calendar,
  },
  {
    title: "Compare",
    url: "/compare",
    icon: GitCompare,
  },
  {
    title: "Approvals",
    url: "/approvals",
    icon: CheckCircle,
  },
  {
    title: "Publish",
    url: "/publish",
    icon: Share,
  },
  {
    title: "My Timetable",
    url: "/my-timetable",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: any) => {
    if (item.children) {
      return item.children.some((child: any) => isActive(child.url));
    }
    return isActive(item.url);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-[var(--transition-quick)] ${
                          isActive || isParentActive(item)
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                  {item.children && !collapsed && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <SidebarMenuButton key={child.title} asChild>
                          <NavLink
                            to={child.url}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-[var(--transition-quick)] ${
                                isActive
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              }`
                            }
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
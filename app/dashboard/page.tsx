"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingBag, Heart, Package, Settings, LogOut,
  TrendingUp, Users, DollarSign, Star, Eye, ArrowUp, ArrowDown,
  Bell, Search, Menu, X, ChevronRight, Plus, Edit, Trash2,
  BarChart2, PieChart, Activity
} from "lucide-react";
import { products, categories } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "overview" | "products" | "orders" | "customers" | "analytics" | "settings";

const sidebarItems = [
  { id: "overview" as Tab,   label: "Overview",   icon: LayoutDashboard },
  { id: "products" as Tab,   label: "Products",   icon: Package },
  { id: "orders" as Tab,     label: "Orders",     icon: ShoppingBag },
  { id: "customers" as Tab,  label: "Customers",  icon: Users },
  { id: "analytics" as Tab,  label: "Analytics",  icon: BarChart2 },
  { id: "settings" as Tab,   label: "Settings",   icon: Settings },
];

const mockOrders = [
  { id:"ORD-001", customer:"Sarah Chen",    total:248, status:"delivered",  items:3, date:"2024-05-12", product:"Dragon Phoenix Scarf" },
  { id:"ORD-002", customer:"James Morrison",total:68,  status:"processing",  items:1, date:"2024-05-14", product:"Longjing Tea" },
  { id:"ORD-003", customer:"Yuki Tanaka",   total:580, status:"shipped",     items:1, date:"2024-05-15", product:"Jade Bracelet" },
  { id:"ORD-004", customer:"Emma Wilson",   total:134, status:"pending",     items:2, date:"2024-05-16", product:"Silk Fan + Lantern" },
  { id:"ORD-005", customer:"Liu Wei",       total:890, status:"delivered",   items:4, date:"2024-05-10", product:"Ceramics Set" },
  { id:"ORD-006", customer:"Carlos Rivera", total:156, status:"cancelled",   items:1, date:"2024-05-09", product:"Pu-erh Tea Cake" },
];

const mockCustomers = [
  { name:"Sarah Chen",    email:"sarah@email.com",    orders:8,  spent:1240, avatar:"https://i.pravatar.cc/40?img=1",  location:"New York, USA",   joined:"Jan 2023", status:"vip" },
  { name:"James Morrison",email:"james@email.com",    orders:3,  spent:340,  avatar:"https://i.pravatar.cc/40?img=3",  location:"London, UK",      joined:"Mar 2023", status:"regular" },
  { name:"Yuki Tanaka",   email:"yuki@email.com",     orders:5,  spent:2100, avatar:"https://i.pravatar.cc/40?img=5",  location:"Tokyo, Japan",    joined:"Feb 2023", status:"vip" },
  { name:"Emma Wilson",   email:"emma@email.com",     orders:2,  spent:280,  avatar:"https://i.pravatar.cc/40?img=9",  location:"Sydney, AU",      joined:"Apr 2024", status:"regular" },
  { name:"Liu Wei",       email:"liu@email.com",      orders:12, spent:3800, avatar:"https://i.pravatar.cc/40?img=12", location:"Shanghai, China", joined:"Dec 2022", status:"vip" },
];

const statCards = [
  { label:"Total Revenue",  value:"$48,290", change:"+12.5%", up:true,  icon:DollarSign, color:"#C8102E" },
  { label:"Total Orders",   value:"1,204",   change:"+8.2%",  up:true,  icon:ShoppingBag,color:"#D4AF37" },
  { label:"Customers",      value:"892",     change:"+18.4%", up:true,  icon:Users,      color:"#10b981" },
  { label:"Avg Rating",     value:"4.8 ★",   change:"-0.1",   up:false, icon:Star,       color:"#8b5cf6" },
];

const statusColor: Record<string,string> = {
  delivered:"#10b981", processing:"#3b82f6", shipped:"#f59e0b", pending:"#6b7280", cancelled:"#ef4444"
};

export default function DashboardPage() {
  const [tab, setTab]         = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch]   = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ paddingTop: "var(--nav-height)", background: "var(--color-surface-alt)" }}>
      {/* Sidebar */}
      <aside className={cn(
        "w-64 shrink-0 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300",
        "lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )} style={{ paddingTop: "var(--nav-height)", background: "var(--color-secondary)", borderRight: "1px solid rgba(212,175,55,0.15)" }}>
        {/* Admin profile */}
        <div className="p-5 border-b" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="https://i.pravatar.cc/40?img=7" alt="Admin" width={40} height={40} />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Admin User</p>
              <p className="text-xs" style={{ color: "var(--color-gold)" }}>Store Manager</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
                    className={cn("sidebar-link w-full text-left", tab === item.id && "active")}
                    style={{ color: tab === item.id ? "var(--color-gold)" : "rgba(255,248,240,0.6)" }}>
              <item.icon size={18} />
              {item.label}
              {item.id === "orders" && <span className="ml-auto badge" style={{ background: "rgba(200,16,46,0.9)", color:"#fff", fontSize:"10px" }}>6</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <Link href="/" className="sidebar-link w-full" style={{ color: "rgba(255,248,240,0.5)" }}>
            <LogOut size={18} /> Back to Store
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="sticky top-[var(--nav-height)] z-30 flex items-center gap-4 px-6 py-3"
             style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn btn-ghost btn-icon">
            <Menu size={20} />
          </button>
          <h2 className="font-display font-bold text-lg capitalize">{tab}</h2>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-ink-muted)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                     className="input pl-9 py-2 text-sm w-56" />
            </div>
            <button className="btn btn-ghost btn-icon relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s, i) => (
                  <div key={s.label} className="stat-card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                           style={{ background: `${s.color}18` }}>
                        <s.icon size={22} style={{ color: s.color }} />
                      </div>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${s.up ? "text-green-600" : "text-red-500"}`}>
                        {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{s.change}
                      </span>
                    </div>
                    <p className="font-display font-black text-2xl" style={{ color: "var(--color-ink)" }}>{s.value}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-ink-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-lg">Revenue Overview</h3>
                    <select className="input py-1 text-sm w-32"><option>Last 7 days</option><option>Last 30 days</option><option>This year</option></select>
                  </div>
                  {/* Simple bar chart */}
                  <div className="flex items-end gap-2 h-48">
                    {[65,40,80,55,90,70,100,45,78,88,60,95].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                             style={{ height: `${h}%`, background: i === 11 ? "var(--gradient-dragon)" : "rgba(200,16,46,0.15)", border: i===11?"none":"none", minHeight:"4px" }} />
                        <span className="text-xs" style={{ color: "var(--color-ink-faint)", fontSize:"10px" }}>
                          {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-display font-bold text-lg mb-6">Category Split</h3>
                  <div className="space-y-4">
                    {categories.slice(0,5).map((cat, i) => {
                      const pct = [35, 25, 18, 12, 10][i];
                      return (
                        <div key={cat.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{cat.name}</span>
                            <span className="font-semibold">{pct}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
                  <h3 className="font-display font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setTab("orders")} className="btn btn-ghost btn-sm text-sm flex items-center gap-1" style={{ color: "var(--color-primary)" }}>
                    View all <ChevronRight size={14} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead><tr>
                      <th>Order</th><th>Customer</th><th>Product</th><th>Total</th><th>Status</th><th>Date</th>
                    </tr></thead>
                    <tbody>
                      {mockOrders.slice(0,5).map(o => (
                        <tr key={o.id}>
                          <td className="font-mono text-xs font-semibold">{o.id}</td>
                          <td className="font-medium">{o.customer}</td>
                          <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{o.product}</td>
                          <td className="font-semibold" style={{ color: "var(--color-primary)" }}>{formatPrice(o.total)}</td>
                          <td>
                            <span className="badge text-white" style={{ background: statusColor[o.status] }}>
                              {o.status}
                            </span>
                          </td>
                          <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === "products" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{filteredProducts.length} products</p>
                <button className="btn btn-primary btn-sm flex items-center gap-2">
                  <Plus size={16} /> Add Product
                </button>
              </div>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead><tr>
                      <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Status</th><th>Actions</th>
                    </tr></thead>
                    <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{p.name}</p>
                                <p className="text-xs font-chinese" style={{ color: "var(--color-primary)" }}>{p.nameZh}</p>
                              </div>
                            </div>
                          </td>
                          <td><span className="tag">{p.category}</span></td>
                          <td className="font-semibold" style={{ color: "var(--color-primary)" }}>{formatPrice(p.price)}</td>
                          <td>
                            <span className={`font-semibold text-sm ${p.stock <= 5 ? "text-red-500" : "text-green-600"}`}>{p.stock}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-1">
                              <Star size={13} fill="var(--color-gold)" style={{ color: "var(--color-gold)" }} />
                              <span className="text-sm">{p.rating}</span>
                            </div>
                          </td>
                          <td>
                            {p.featured && <span className="badge badge-primary">Featured</span>}
                            {p.bestseller && <span className="badge badge-gold">Hot</span>}
                            {p.newArrival && <span className="badge badge-success">New</span>}
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-ghost btn-icon w-8 h-8 hover:text-blue-500"><Edit size={14} /></button>
                              <button className="btn btn-ghost btn-icon w-8 h-8 hover:text-red-500"><Trash2 size={14} /></button>
                              <Link href={`/product/${p.id}`} className="btn btn-ghost btn-icon w-8 h-8"><Eye size={14} /></Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === "orders" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 mb-2">
                {["all","pending","processing","shipped","delivered","cancelled"].map(s => (
                  <button key={s} className="tag capitalize">{s === "all" ? "All Orders" : s}</button>
                ))}
              </div>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                    <tbody>
                      {mockOrders.map(o => (
                        <tr key={o.id}>
                          <td className="font-mono text-xs font-bold">{o.id}</td>
                          <td className="font-medium">{o.customer}</td>
                          <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{o.items} item{o.items>1?"s":""}</td>
                          <td className="font-bold" style={{ color: "var(--color-primary)" }}>{formatPrice(o.total)}</td>
                          <td>
                            <select className="text-xs px-2 py-1 rounded-lg font-semibold border-0 cursor-pointer"
                                    defaultValue={o.status}
                                    style={{ background: `${statusColor[o.status]}18`, color: statusColor[o.status] }}>
                              {["pending","processing","shipped","delivered","cancelled"].map(s=>(
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{o.date}</td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-ghost btn-icon w-8 h-8"><Eye size={14} /></button>
                              <button className="btn btn-ghost btn-icon w-8 h-8"><Edit size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {tab === "customers" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Customer</th><th>Location</th><th>Orders</th><th>Spent</th><th>Joined</th><th>Status</th></tr></thead>
                  <tbody>
                    {mockCustomers.map(c => (
                      <tr key={c.email}>
                        <td>
                          <div className="flex items-center gap-3">
                            <Image src={c.avatar} alt={c.name} width={36} height={36} className="rounded-full" />
                            <div>
                              <p className="font-medium">{c.name}</p>
                              <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{c.location}</td>
                        <td className="font-semibold text-center">{c.orders}</td>
                        <td className="font-bold" style={{ color: "var(--color-primary)" }}>{formatPrice(c.spent)}</td>
                        <td className="text-sm" style={{ color: "var(--color-ink-muted)" }}>{c.joined}</td>
                        <td>
                          <span className={`badge ${c.status==="vip" ? "badge-gold" : "badge-outline"}`}>
                            {c.status === "vip" ? "★ VIP" : "Regular"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {tab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label:"Page Views",      value:"28,490", icon:Eye,      change:"+24.5%" },
                  { label:"Conversion Rate", value:"3.8%",   icon:TrendingUp,change:"+0.5%" },
                  { label:"Avg Order Value", value:"$124",   icon:DollarSign,change:"+9.2%" },
                  { label:"Return Rate",     value:"12.4%",  icon:Activity, change:"-2.1%" },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <s.icon size={24} className="mb-3" style={{ color: "var(--color-primary)" }} />
                    <p className="font-display font-black text-2xl">{s.value}</p>
                    <p className="text-xs mt-1 mb-1" style={{ color: "var(--color-ink-muted)" }}>{s.label}</p>
                    <p className="text-xs text-green-600 font-semibold">{s.change} vs last month</p>
                  </div>
                ))}
              </div>
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg mb-6">Top Products by Revenue</h3>
                <div className="space-y-4">
                  {products.slice(0,5).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold w-5" style={{ color: "var(--color-ink-faint)" }}>#{i+1}</span>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{p.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{p.reviews} sales</p>
                      </div>
                      <div className="flex-1 max-w-xs">
                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${90-i*15}%` }} /></div>
                      </div>
                      <p className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>{formatPrice(p.price * p.reviews * 0.1)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg mb-5">Store Settings</h3>
                <div className="space-y-4">
                  {[["Store Name","Dragon Market"],["Store Email","hello@dragonmarket.com"],["Currency","USD ($)"],["Language","English"]].map(([label,val])=>(
                    <div key={label}>
                      <label className="block text-sm font-medium mb-1.5">{label}</label>
                      <input className="input" defaultValue={val} />
                    </div>
                  ))}
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg mb-5">Shipping Settings</h3>
                <div className="space-y-3">
                  {[["Free shipping threshold","$150"],["Standard shipping rate","$15"],["Express shipping rate","$35"]].map(([label,val])=>(
                    <div key={label} className="flex items-center gap-4">
                      <label className="flex-1 text-sm">{label}</label>
                      <input className="input w-28 py-2 text-sm" defaultValue={val} />
                    </div>
                  ))}
                  <button className="btn btn-primary mt-2">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

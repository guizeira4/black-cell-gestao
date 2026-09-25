import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const localDay = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
  now = () => localDay(),
  id = () => crypto.randomUUID(),
  cash = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  date = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("pt-BR");
const phones: Record<string, [string, string]> = {
  "iPhone 8": [
    "64GB, 128GB, 256GB",
    "Prateado, Cinza Espacial, Ouro, Vermelho (RED)",
  ],
  "iPhone 8 Plus": [
    "64GB, 128GB, 256GB",
    "Prateado, Cinza Espacial, Ouro, Vermelho (RED)",
  ],
  "iPhone X": ["64GB, 256GB", "Prateado, Cinza Espacial"],
  "iPhone XS": ["64GB, 256GB, 512GB", "Prateado, Cinza Espacial, Ouro"],
  "iPhone XS Max": ["64GB, 256GB, 512GB", "Prateado, Cinza Espacial, Ouro"],
  "iPhone XR": [
    "64GB, 128GB, 256GB",
    "Preto, Branco, Azul, Amarelo, Coral, Vermelho",
  ],
  "iPhone 11": [
    "64GB, 128GB, 256GB",
    "Roxo, Verde, Amarelo, Preto, Branco, Vermelho",
  ],
  "iPhone 11 Pro": [
    "64GB, 256GB, 512GB",
    "Verde Meia-noite, Cinza Espacial, Prata, Ouro",
  ],
  "iPhone 11 Pro Max": [
    "64GB, 256GB, 512GB",
    "Verde Meia-noite, Cinza Espacial, Prata, Ouro",
  ],
  "iPhone 12": [
    "64GB, 128GB, 256GB",
    "Azul, Verde, Vermelho, Branco, Preto, Roxo",
  ],
  "iPhone 12 mini": [
    "64GB, 128GB, 256GB",
    "Azul, Verde, Vermelho, Branco, Preto, Roxo",
  ],
  "iPhone 12 Pro": [
    "128GB, 256GB, 512GB",
    "Prata, Grafite, Ouro, Azul Pacífico",
  ],
  "iPhone 12 Pro Max": [
    "128GB, 256GB, 512GB",
    "Prata, Grafite, Ouro, Azul Pacífico",
  ],
  "iPhone 13": [
    "128GB, 256GB, 512GB",
    "Rosa, Azul, Meia-noite, Estelar, Vermelho",
  ],
  "iPhone 13 mini": [
    "128GB, 256GB, 512GB",
    "Rosa, Azul, Meia-noite, Estelar, Vermelho",
  ],
  "iPhone 13 Pro": [
    "128GB, 256GB, 512GB, 1TB",
    "Grafite, Ouro, Prata, Azul Sierra",
  ],
  "iPhone 13 Pro Max": [
    "128GB, 256GB, 512GB, 1TB",
    "Grafite, Ouro, Prata, Azul Sierra",
  ],
  "iPhone 14": [
    "128GB, 256GB, 512GB",
    "Azul, Roxo, Meia-noite, Estelar, Vermelho",
  ],
  "iPhone 14 Plus": [
    "128GB, 256GB, 512GB",
    "Azul, Roxo, Meia-noite, Estelar, Vermelho",
  ],
  "iPhone 14 Pro": [
    "128GB, 256GB, 512GB, 1TB",
    "Preto Espacial, Prata, Ouro, Roxo Profundo",
  ],
  "iPhone 14 Pro Max": [
    "128GB, 256GB, 512GB, 1TB",
    "Preto Espacial, Prata, Ouro, Roxo Profundo",
  ],
  "iPhone 15": ["128GB, 256GB, 512GB", "Azul, Rosa, Amarelo, Verde, Preto"],
  "iPhone 15 Plus": [
    "128GB, 256GB, 512GB",
    "Azul, Rosa, Amarelo, Verde, Preto",
  ],
  "iPhone 15 Pro": [
    "128GB, 256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Azul, Titânio Branco, Titânio Preto",
  ],
  "iPhone 15 Pro Max": [
    "128GB, 256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Azul, Titânio Branco, Titânio Preto",
  ],
  "iPhone 16": ["128GB, 256GB, 512GB", "Azul, Rosa, Preto, Branco, Verde"],
  "iPhone 16 Plus": ["128GB, 256GB, 512GB", "Azul, Rosa, Preto, Branco, Verde"],
  "iPhone 16 Pro": [
    "256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Preto, Titânio Branco, Titânio Ouro",
  ],
  "iPhone 16 Pro Max": [
    "256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Preto, Titânio Branco, Titânio Ouro",
  ],
  "iPhone 17": ["128GB, 256GB, 512GB", "Azul, Vermelho, Preto, Branco, Verde"],
  "iPhone 17 Plus": [
    "128GB, 256GB, 512GB",
    "Azul, Vermelho, Preto, Branco, Verde",
  ],
  "iPhone 17 Pro": [
    "256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Preto, Titânio Branco, Titânio Ouro",
  ],
  "iPhone 17 Pro Max": [
    "256GB, 512GB, 1TB",
    "Titânio Natural, Titânio Preto, Titânio Branco, Titânio Ouro",
  ],
  "iPhone 18 Pro": [
    "256GB, 512GB, 1TB, 2TB",
    "Preto, Prateado, Glacial, Bordô",
  ],
  "iPhone 18 Pro Max": [
    "256GB, 512GB, 1TB, 2TB",
    "Preto, Prateado, Glacial, Bordô",
  ],
};
const initialProducts = [
    {
      id: "p1",
      model: "iPhone 11",
      storage: "128GB",
      color: "Preto",
      qty: 3,
      cost: 1650,
      price: 2399,
      note: "",
    },
    {
      id: "p2",
      model: "iPhone 15 Pro Max",
      storage: "512GB",
      color: "Titânio Preto",
      qty: 1,
      cost: 5600,
      price: 6999,
      note: "Caixa inclusa",
    },
  ],
  initialCharges = [
    {
      id: "c1",
      name: "João Silva",
      phone: "11987654321",
      amount: 2066.33,
      due: now(),
      paid: false,
      sale: "Venda #1024",
    },
    {
      id: "c2",
      name: "Carlos Oliveira",
      phone: "11965432109",
      amount: 850,
      due: "2026-09-21",
      paid: false,
      sale: "Venda #1018",
    },
    {
      id: "c3",
      name: "Ana Costa",
      phone: "11954321098",
      amount: 500,
      due: "2026-09-18",
      paid: true,
      paidAt: "2026-09-19",
      sale: "Venda #1016",
    },
  ];
const stored = (key: string, seed: any) => {
  const value = useState(
    () => JSON.parse(localStorage.getItem(key) || "null") || seed,
  );
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value[0])),
    [key, value[0]],
  );
  return value;
};
function state(c: any) {
  return c.paid
    ? "paid"
    : c.due === now()
      ? "today"
      : c.due < now()
        ? "late"
        : "open";
}
function status(c: any) {
  return (
    {
      paid: "Pago",
      today: "Vence hoje",
      late: "Atrasado",
      open: "A receber",
    } as any
  )[state(c)];
}
function Icon({ children }: { children: string }) {
  return <span className="emoji">{children}</span>;
}
function App() {
  const saved = (key: string, seed: any) =>
    useState(() => JSON.parse(localStorage.getItem(key) || "null") || seed);
  const [tab, setTab] = useState("home"),
    [products, setProducts] = saved("bc-products", initialProducts),
    [sales, setSales] = saved("bc-sales", []),
    [charges, setCharges] = saved("bc-charges", initialCharges),
    [config, setConfig] = saved("bc-config", {
      owner: "Administrador",
      logo: "/black-cell-logo.png",
    }),
    [notice, setNotice] = useState("");
  useEffect(() => {
    localStorage.setItem("bc-products", JSON.stringify(products));
    localStorage.setItem("bc-sales", JSON.stringify(sales));
    localStorage.setItem("bc-charges", JSON.stringify(charges));
    localStorage.setItem("bc-config", JSON.stringify(config));
  }, [products, sales, charges, config]);
  const alert = (x: string) => {
    setNotice(x);
    setTimeout(() => setNotice(""), 2500);
  };
  const stat = useMemo(
    () => ({
      units: products.reduce((a: any, p: any) => a + p.qty, 0),
      cost: products.reduce((a: any, p: any) => a + p.qty * p.cost, 0),
      sale: products.reduce((a: any, p: any) => a + p.qty * p.price, 0),
      late: charges
        .filter((c: any) => state(c) === "late")
        .reduce((a: any, c: any) => a + c.amount, 0),
      due: charges
        .filter((c: any) => state(c) === "today")
        .reduce((a: any, c: any) => a + c.amount, 0),
      paid: charges
        .filter((c: any) => c.paid)
        .reduce((a: any, c: any) => a + c.amount, 0),
    }),
    [products, charges],
  );
  const nav = [
    ["home", "⌂", "Início"],
    ["stock", "▣", "Estoque"],
    ["sales", "▤", "Vendas"],
    ["charges", "$", "Cobranças"],
    ["reports", "◫", "Relatórios"],
    ["settings", "⚙", "Mais"],
  ];
  return (
    <div className="app">
      <aside>
        <div className="logo brand">
          <img src={config.logo} />
          <span>
            BLACK CELL<em>GESTÃO</em>
          </span>
        </div>
        <nav>
          {nav.map((n) => (
            <button
              className={tab === n[0] ? "active" : ""}
              onClick={() => setTab(n[0])}
            >
              <Icon>{n[1]}</Icon>
              {n[2]}
            </button>
          ))}
        </nav>
        <div className="user">
          <div>{config.owner[0]}</div>
          <span>
            {config.owner}
            <small>Administrador</small>
          </span>
        </div>
      </aside>
      <main>
        <header>
          <div>
            <p>BLACK CELL Gestão</p>
            <h1>
              {tab === "home"
                ? `Olá, ${config.owner}!`
                : (
                    {
                      stock: "Estoque",
                      sales: "Vendas",
                      charges: "Cobranças",
                      reports: "Relatórios",
                      settings: "Configurações",
                    } as any
                  )[tab]}
            </h1>
          </div>
        </header>
        {tab === "home" && <Home stat={stat} charges={charges} go={setTab} />}{" "}
        {tab === "stock" && (
          <Stock products={products} setProducts={setProducts} />
        )}{" "}
        {tab === "sales" && (
          <Sales
            products={products}
            setProducts={setProducts}
            sales={sales}
            setSales={setSales}
            charges={charges}
            setCharges={setCharges}
            alert={alert}
          />
        )}{" "}
        {tab === "charges" && (
          <Charges charges={charges} setCharges={setCharges} />
        )}{" "}
        {tab === "reports" && (
          <Reports stat={stat} sales={sales} charges={charges} />
        )}{" "}
        {tab === "settings" && (
          <Settings config={config} setConfig={setConfig} alert={alert} />
        )}
      </main>
      <nav className="bottom">
        {nav.slice(0, 5).map((n) => (
          <button
            className={tab === n[0] ? "active" : ""}
            onClick={() => setTab(n[0])}
          >
            <Icon>{n[1]}</Icon>
            <small>{n[2]}</small>
          </button>
        ))}
      </nav>
      {notice && <div className="toast">✓ {notice}</div>}
    </div>
  );
}
function Card({ name, value }: { name: string; value: string }) {
  return (
    <div className="stat gold">
      <small>{name}</small>
      <strong>{value}</strong>
      <span>Atualizado hoje</span>
    </div>
  );
}
function Home({ stat, charges, go }: any) {
  return (
    <section className="screen">
      <div className="grid stats">
        <Card name="Recebido" value={cash(stat.paid)} />
        <Card name="Atrasado" value={cash(stat.late)} />
        <Card name="Estoque (custo)" value={cash(stat.cost)} />
        <Card name="Estoque (venda)" value={cash(stat.sale)} />
      </div>
      <div className="quick">
        <button onClick={() => go("sales")}>＋ Nova venda</button>
        <button onClick={() => go("stock")}>Adicionar produto</button>
      </div>
      <div className="split">
        <div className="panel">
          <h2>Valores recebidos na semana</h2>
          <p className="muted">
            O valor entra no gráfico no dia em que foi marcado como pago.
          </p>
          <div className="chart">
            {[0, 1, 2, 3, 4, 5, 6].map((n, i) => {
              const v = charges
                .filter((c: any) => c.paid && new Date(c.paidAt).getDay() === n)
                .reduce((a: any, c: any) => a + c.amount, 0);
              return (
                <div>
                  <i style={{ height: (v ? 70 : 5) + "%" }} />
                  <b>{cash(v)}</b>
                  <small>
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i]}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel alerts">
          <h2>Precisa de atenção</h2>
          <button onClick={() => go("charges")}>
            <span className="badge today">{cash(stat.due)}</span>
            <div>
              <b>Vence hoje</b>
              <small>Cobrança manual</small>
            </div>
          </button>
          <button onClick={() => go("charges")}>
            <span className="badge late">{cash(stat.late)}</span>
            <div>
              <b>Atrasadas</b>
              <small>Cobrar manualmente</small>
            </div>
          </button>
          <button onClick={() => go("stock")}>
            <span className="badge neutral">{stat.units}</span>
            <div>
              <b>Estoque</b>
              <small>Custo: {cash(stat.cost)}</small>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
function Stock({ products, setProducts, sales = [] }: any) {
  const [open, setOpen] = useState(false),
    [, setStockHistory] = stored("bc-stock-history", []),
    [x, setX] = useState({
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Titânio Natural",
      qty: "1",
      cost: "0",
      price: "0",
      note: "",
    }),
    set = (k: string, v: string) => setX((a: any) => ({ ...a, [k]: v })),
    t = phones[x.model];
  return (
    <section className="screen">
      <div className="toolbar">
        <h2>Produtos</h2>
        <button className="primary" onClick={() => setOpen(!open)}>
          ＋ Produto
        </button>
      </div>
      {open && (
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            const entry = {
              id: id(),
              date: now(),
              model: x.model,
              quantity: +x.qty,
              cost: +x.cost,
              amount: +x.qty * +x.cost,
            };
            setProducts((a: any) => [
              { ...x, id: id(), qty: +x.qty, cost: +x.cost, price: +x.price },
              ...a,
            ]);
            setStockHistory((a: any) => [entry, ...a]);
            setOpen(false);
          }}
        >
          <div className="form-grid">
            <label>
              Modelo
              <input
                list="models"
                value={x.model}
                onChange={(e) => set("model", e.target.value)}
              />
              <datalist id="models">
                {Object.keys(phones).map((k) => (
                  <option value={k} />
                ))}
              </datalist>
            </label>
            <label>
              Armazenamento
              <input
                list="storage"
                value={x.storage}
                onChange={(e) => set("storage", e.target.value)}
              />
              <datalist id="storage">
                {(t?.[0].split(", ") || []).map((k) => (
                  <option value={k} />
                ))}
              </datalist>
            </label>
            <label>
              Cor
              <input
                list="colors"
                value={x.color}
                onChange={(e) => set("color", e.target.value)}
              />
              <datalist id="colors">
                {(t?.[1].split(", ") || []).map((k) => (
                  <option value={k} />
                ))}
              </datalist>
            </label>
            <label>
              Quantidade
              <input
                type="number"
                min="1"
                value={x.qty}
                onChange={(e) => set("qty", e.target.value)}
              />
            </label>
            <label>
              Custo
              <input
                type="number"
                min="0"
                value={x.cost}
                onChange={(e) => set("cost", e.target.value)}
              />
            </label>
            <label>
              Venda
              <input
                type="number"
                min="0"
                value={x.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </label>
          </div>
          <label>
            Observação
            <textarea
              value={x.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="Detalhes do produto"
            />
          </label>
          <button className="primary">Salvar produto</button>
        </form>
      )}
      <div className="products">
        {products.map((p: any) => (
          <article className="product">
            <div className="phone-shape">▣</div>
            <div>
              <h3>{p.model}</h3>
              <p>
                {p.storage} · {p.color}
              </p>
              <small>{p.note}</small>
              <b>{cash(p.price)}</b>
              <small>
                Investimento atual: {cash(p.qty * p.cost)} · Potencial:{" "}
                {cash(p.qty * p.price)}
              </small>
            </div>
            <div className="qty">
              {p.qty}
              <small>unidades</small>
            </div>
            <button
              className="delete"
              onClick={() => {
                if (sales.some((s: any) => s.productId === p.id))
                  return alert(
                    "Este produto possui vendas vinculadas e não pode ser excluído.",
                  );
                if (confirm("Excluir este produto?"))
                  setProducts((a: any) => a.filter((q: any) => q.id !== p.id));
              }}
            >
              🗑
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
function Sales({
  products,
  setProducts,
  sales,
  setSales,
  charges,
  setCharges,
  alert,
}: any) {
  const [open, setOpen] = useState(false),
    [customers, setCustomers] = stored("bc-customers", []),
    available = products.filter((p: any) => Number(p.qty) > 0),
    [f, setF] = useState({
      customer: "",
      phone: "",
      product: products[0]?.id || "",
      amount: "",
      payment: "PIX",
      count: "1",
      due: now(),
    }),
    set = (k: string, v: string) => setF((a: any) => ({ ...a, [k]: v }));
  useEffect(() => {
    if (available.length && !available.some((p: any) => p.id === f.product))
      setF((a) => ({ ...a, product: available[0].id }));
  }, [products]);
  const pick = (v: string) => {
    const c = customers.find((x: any) => x.id === v);
    setF((a) => ({ ...a, customer: c?.name || "", phone: c?.phone || "" }));
  };
  return (
    <section className="screen">
      <div className="toolbar">
        <h2>Histórico de vendas</h2>
        <button className="primary" onClick={() => setOpen(!open)}>
          ＋ Venda
        </button>
      </div>
      {open && (
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            const p = products.find((a: any) => a.id === f.product),
              n = +f.count;
            if (!p || !f.customer || !f.phone || +f.amount <= 0)
              return alert("Preencha cliente, WhatsApp, produto e valor.");
            if (p.qty < 1) return alert("Produto sem estoque.");
            const code = "Venda #" + Math.floor(1000 + Math.random() * 8999),
              old = customers.find((c: any) => c.name === f.customer);
            setCustomers((a: any) =>
              old
                ? a.map((c: any) =>
                    c.id === old.id ? { ...c, phone: f.phone } : c,
                  )
                : [{ id: id(), name: f.customer, phone: f.phone }, ...a],
            );
            setSales((a: any) => [
              {
                id: code,
                customer: f.customer,
                product: p.model,
                productId: p.id,
                amount: +f.amount,
                date: now(),
                payment: f.payment,
              },
              ...a,
            ]);
            setProducts((a: any) =>
              a.map((q: any) => (q.id === p.id ? { ...q, qty: q.qty - 1 } : q)),
            );
            setCharges((a: any) => [
              ...Array.from({ length: n }, (_, i) => {
                const d = new Date(f.due + "T12:00:00");
                d.setMonth(d.getMonth() + i);
                return {
                  id: id(),
                  name: f.customer,
                  phone: f.phone,
                  amount: +f.amount / n,
                  due: localDay(d),
                  paid: n === 1,
                  paidAt: n === 1 ? now() : undefined,
                  sale: code,
                  number: i + 1,
                };
              }),
              ...a,
            ]);
            setOpen(false);
            alert("Venda salva, estoque atualizado e parcelas criadas.");
          }}
        >
          <div className="form-grid">
            <label>
              Cliente cadastrado
              <select onChange={(e) => pick(e.target.value)}>
                <option value="">Novo cliente</option>
                {customers.map((c: any) => (
                  <option value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label>
              Cliente
              <input
                required
                value={f.customer}
                onChange={(e) => set("customer", e.target.value)}
              />
            </label>
            <label>
              WhatsApp
              <input
                required
                inputMode="tel"
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </label>
            <label>
              Produto
              <select
                required
                disabled={!available.length}
                value={f.product}
                onChange={(e) => set("product", e.target.value)}
              >
                <option value="">
                  {available.length
                    ? "Selecione o produto"
                    : "Nenhum produto disponível"}
                </option>
                {available.map((a: any) => (
                  <option value={a.id}>
                    {a.model} · {a.storage} · {a.color} ({a.qty} un.)
                  </option>
                ))}
              </select>
            </label>
            {!available.length && (
              <p className="hint">
                Cadastre um produto ou aumente o estoque para realizar uma
                venda.
              </p>
            )}
            <label>
              Valor
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={f.amount}
                onChange={(e) => set("amount", e.target.value)}
              />
            </label>
            <label>
              Forma de pagamento
              <select
                value={f.payment}
                onChange={(e) => set("payment", e.target.value)}
              >
                {["PIX", "Dinheiro", "Débito", "Crédito"].map((x) => (
                  <option>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Parcelamento
              <select
                value={f.count}
                onChange={(e) => set("count", e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 12].map((n) => (
                  <option value={n}>{n === 1 ? "À vista" : n + "x"}</option>
                ))}
              </select>
            </label>
            <label>
              Vencimento da primeira parcela
              <input
                type="date"
                value={f.due}
                onChange={(e) => set("due", e.target.value)}
              />
            </label>
          </div>
          <button className="primary" disabled={!available.length}>
            Confirmar venda
          </button>
        </form>
      )}
      <div className="sales-list">
        {sales.map((s: any) => (
          <article className="sale">
            <div>
              <b>{s.customer}</b>
              <small>
                {s.product} · {date(s.date)}
              </small>
            </div>
            <b>{cash(s.amount)}</b>
            <button
              className="delete"
              onClick={() => {
                const saleCharges = charges.filter((c: any) => c.sale === s.id);
                const hasPaidInstallment = saleCharges.some(
                  (c: any) => c.paid,
                );
                if (
                  !confirm(
                    hasPaidInstallment
                      ? "Excluir esta venda? As parcelas não pagas serão removidas. Os pagamentos já recebidos serão preservados no histórico e o aparelho não voltará ao estoque."
                      : "Excluir esta venda? O aparelho voltará ao estoque e as parcelas serão removidas.",
                  )
                )
                  return;
                setSales((a: any) => a.filter((q: any) => q.id !== s.id));
                setCharges((a: any) =>
                  a.filter((q: any) => q.sale !== s.id || q.paid),
                );
                if (!hasPaidInstallment) {
                  setProducts((a: any) =>
                    a.map((p: any) =>
                      p.id === s.productId ? { ...p, qty: p.qty + 1 } : p,
                    ),
                  );
                  alert("Venda excluída, parcelas removidas e estoque devolvido.");
                } else {
                  alert(
                    "Venda excluída. Pagamentos recebidos foram preservados e o estoque não foi devolvido.",
                  );
                }
              }}
            >
              🗑 Excluir venda
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
function Charges({ charges, setCharges }: any) {
  const [f, setF] = useState("all"),
    [history, setHistory] = stored("bc-charge-history", []);
  const list = charges.filter((c: any) => f === "all" || state(c) === f);
  const send = (c: any) => {
    let phone = c.phone.replace(/\D/g, "");
    if (phone.length === 10 || phone.length === 11) phone = "55" + phone;
    if (phone.length < 12)
      return alert("Cadastre o WhatsApp do cliente para realizar a cobrança.");
    const late = state(c) === "late",
      msg = late
        ? `Olá, ${c.name}!\n\nA Black Cell identificou que sua parcela de ${cash(c.amount)}, com vencimento em ${date(c.due)}, está em atraso. Pedimos que regularize o pagamento assim que possível.\n\nBlack Cell`
        : `Olá, ${c.name}!\n\nA Black Cell está passando para lembrar que sua parcela de ${cash(c.amount)} vence hoje, ${date(c.due)}.\n\nCaso já tenha realizado o pagamento, desconsidere esta mensagem.\n\nObrigado!\nBlack Cell`;
    setHistory((a: any) => [
      {
        id: id(),
        name: c.name,
        sale: c.sale,
        type: late ? "atrasado" : "vence hoje",
        at: new Date().toLocaleString("pt-BR"),
      },
      ...a,
    ]);
    window.open(
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg),
      "_blank",
    );
  };
  const remove = (c: any) => {
    if (
      confirm(
        "Excluir esta cobrança? Esta ação remove somente a parcela/cobrança selecionada.",
      )
    )
      setCharges((a: any) => a.filter((q: any) => q.id !== c.id));
  };
  return (
    <section className="screen">
      <div className="filter">
        {[
          ["all", "Todas"],
          ["open", "🔵 A receber"],
          ["today", "🟡 Vence hoje"],
          ["late", "🔴 Atrasadas"],
          ["paid", "🟢 Pagas"],
        ].map((x) => (
          <button
            className={f === x[0] ? "active" : ""}
            onClick={() => setF(x[0])}
          >
            {x[1]}
          </button>
        ))}
      </div>
      <p className="hint">
        Todas as cobranças são manuais. O registro confirma apenas que o botão
        foi acionado.
      </p>
      <div className="charges">
        {list.map((c: any) => (
          <article className="charge">
            <div className="avatar">{c.name[0]}</div>
            <div className="charge-info">
              <b>{c.name}</b>
              <small>
                {c.sale} · Parcela {c.number || 1}
              </small>
              <span>Vencimento: {date(c.due)}</span>
            </div>
            <div className="charge-actions">
              <strong>{cash(c.amount)}</strong>
              <span className={"pill " + state(c)}>{status(c)}</span>
              {!c.paid && (
                <div>
                  {(state(c) === "today" || state(c) === "late") && (
                    <button className="whatsapp" onClick={() => send(c)}>
                      📲 Cobrar no WhatsApp
                    </button>
                  )}
                  <button
                    className="paid-btn"
                    onClick={() =>
                      setCharges((a: any) =>
                        a.map((q: any) =>
                          q.id === c.id
                            ? { ...q, paid: true, paidAt: now() }
                            : q,
                        ),
                      )
                    }
                  >
                    ✅ Marcar como pago
                  </button>
                </div>
              )}
              {c.paid && (
                <button
                  className="delete"
                  onClick={() => {
                    if (
                      confirm(
                        "Excluir este pagamento? A venda e a parcela continuarão registradas.",
                      )
                    )
                      setCharges((a: any) =>
                        a.map((q: any) =>
                          q.id === c.id
                            ? { ...q, paid: false, paidAt: undefined }
                            : q,
                        ),
                      );
                  }}
                >
                  🗑 Excluir pagamento
                </button>
              )}
              {!c.paid && (
                <button className="delete" onClick={() => remove(c)}>
                  🗑 Excluir cobrança
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Reports({ stat, sales, charges }: any) {
  const [m, setM] = useState(now().slice(0, 7)),
    [stockHistory] = stored("bc-stock-history", []),
    paid = charges.filter((c: any) => c.paid && (c.paidAt || "").startsWith(m)),
    salesInMonth = sales.filter((s: any) => s.date.startsWith(m)),
    received = paid.reduce((a: any, c: any) => a + c.amount, 0),
    investmentInMonth = stockHistory
      .filter((entry: any) => entry.date.startsWith(m))
      .reduce((a: number, entry: any) => a + entry.amount, 0);
  return (
    <section className="screen reports">
      <div className="toolbar">
        <h2>Histórico por mês</h2>
        <input type="month" value={m} onChange={(e) => setM(e.target.value)} />
      </div>
      <div className="grid stats">
        <Card name="Recebido no mês" value={cash(received)} />
        <Card
          name="Vendas realizadas"
          value={`${salesInMonth.length} venda(s)`}
        />
        <Card name="Investido no mês" value={cash(investmentInMonth)} />
        <Card name="Estoque (custo)" value={cash(stat.cost)} />
        <Card name="Estoque (venda)" value={cash(stat.sale)} />
        <Card name="Atrasado" value={cash(stat.late)} />
      </div>
      <div className="panel">
        <h2>Investimento em estoque</h2>
        <p className="muted">
          Entradas de custo no mês selecionado. Ao mudar o mês, o valor do
          período muda sem apagar o histórico.
        </p>
        <div className="sales-list">
          {stockHistory
            .filter((entry: any) => entry.date.startsWith(m))
            .map((entry: any) => (
              <article className="sale">
                <div>
                  <b>{entry.model}</b>
                  <small>
                    {entry.quantity} unidade(s) · {date(entry.date)}
                  </small>
                </div>
                <b>{cash(entry.amount)}</b>
              </article>
            ))}
        </div>
      </div>
      <div className="panel">
        <h2>Pagamentos recebidos</h2>
        <p className="muted">
          Aqui entra somente parcela marcada como paga, na data real do
          pagamento.
        </p>
        <div className="sales-list">
          {paid.map((c: any) => (
            <article className="sale">
              <div>
                <b>{c.name}</b>
                <small>
                  {c.sale} · Pago em {date(c.paidAt)}
                </small>
              </div>
              <b>{cash(c.amount)}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Settings({ config, setConfig, alert }: any) {
  const file = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const r = new FileReader();
      r.onload = () => setConfig((c: any) => ({ ...c, logo: r.result }));
      r.readAsDataURL(f);
    }
  };
  return (
    <section className="screen settings">
      <form
        className="panel form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Configurações salvas.");
        }}
      >
        <h2>Administrador</h2>
        <label>
          Nome exibido
          <input
            value={config.owner}
            onChange={(e) =>
              setConfig((c: any) => ({ ...c, owner: e.target.value }))
            }
          />
        </label>
        <label>
          Imagem/logo
          <input type="file" accept="image/*" onChange={file} />
        </label>
        <img className="logo-preview" src={config.logo} />
        <p className="hint">
          A logo enviada já está aplicada. Não existe automação de WhatsApp
          neste sistema.
        </p>
        <button className="primary">Salvar</button>
      </form>
    </section>
  );
}
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
createRoot(document.getElementById("root")!).render(<App />);

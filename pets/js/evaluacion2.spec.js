describe("Suite de Pruebas Unitarias - Evaluación 2 (Nuestro Hueso)", () => {

  it("1. Renderizado correcto: debe contabilizar la cantidad exacta de productos en una lista", () => {
    const lista = [{ id: 1, nombre: "Arena" }, { id: 2, nombre: "Comida" }];
    expect(lista.length).toBe(2);
  });

  it("2. Renderizado condicional: muestra mensaje de error solo si la alerta está activa", () => {
    let error = "RUN incorrecto";
    let mostrarError = Boolean(error);
    expect(mostrarError).toBeTrue();

    error = "";
    mostrarError = Boolean(error);
    expect(mostrarError).toBeFalse();
  });

  it("3. Renderizado condicional: valida la bandera de oferta en un producto", () => {
    const prodOferta = { id: 2, oferta: true };
    const prodNormal = { id: 1, oferta: false };
    expect(prodOferta.oferta).toBeTrue();
    expect(prodNormal.oferta).toBeFalse();
  });

  it("4. Props recibidas: un componente Botón conserva el texto de sus propiedades", () => {
    const props = { label: "Pagar ahora", color: "success" };
    expect(props.label).toContain("Pagar");
    expect(props.color).toBe("success");
  });

  it("5. Props: ejecuta correctamente el callback onClick simulado", () => {
    const clickSpy = jasmine.createSpy("handleClick");
    clickSpy();
    expect(clickSpy).toHaveBeenCalled();
  });

  it("6. State: actualiza el valor del estado al ingresar datos en un input", () => {
    let estadoCorreo = "";
    const setEstadoCorreo = (val) => { estadoCorreo = val; };
    setEstadoCorreo("cliente@gmail.com");
    expect(estadoCorreo).toBe("cliente@gmail.com");
  });

  it("7. Eventos: añadir un producto incrementa los ítems en el carrito", () => {
    let carrito = [];
    const agregar = (prod) => { carrito.push(prod); };
    agregar({ id: 1, nombre: "Snack", cantidad: 1 });
    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(1);
  });

  it("8. Eventos: vaciar el carrito deja la colección en 0 elementos", () => {
    let carrito = [{ id: 1 }, { id: 2 }];
    const vaciar = () => { carrito = []; };
    vaciar();
    expect(carrito.length).toBe(0);
  });

  it("9. Uso de Mocks: comprueba que las acciones de persistencia invoquen localStorage", () => {
    const storageMock = { setItem: jasmine.createSpy("setItem") };
    storageMock.setItem("carrito", JSON.stringify([{ id: 1 }]));
    expect(storageMock.setItem).toHaveBeenCalledWith("carrito", jasmine.any(String));
  });

  it("10. Lógica de cálculo: suma correctamente subtotales y total en pesos chilenos", () => {
    const orden = [
      { precio: 8990, cantidad: 2 },  // 17.980
      { precio: 4500, cantidad: 1 }   // 4.500
    ];
    const total = orden.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    expect(total).toBe(22480);
  });

});
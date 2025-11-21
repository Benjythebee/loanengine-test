export const MediaQuery = () => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        bottom: "calc(2 * var(--spacing))",
        right: "calc(2 * var(--spacing))",
        zIndex: 50,
        opacity: 0.5,
        display: "flex",
        height: "calc(4 * var(--spacing))",
        width: "calc(7 * var(--spacing))",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--foreground)",
        fontWeight: "bold",
        color: "var(--muted)",
        fontSize: "0.6rem",
      }}
    >
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">2XL</div>
    </div>
  );
};

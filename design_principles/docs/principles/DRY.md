# DRY Principle (Don't Repeat Yourself)

The DRY principle states that every piece of knowledge should have a single, unambiguous, authoritative representation within a system. Avoid duplicating logic or code.

## Why DRY?

- Reduces maintenance effort
- Prevents bugs from inconsistent changes
- Improves code readability

## Example: Violating DRY

```csharp
public class OrderService
{
    public decimal CalculateTotal(Order order)
    {
        decimal total = 0;
        foreach (var item in order.Items)
            total += item.Price * item.Quantity;
        return total;
    }
}

public class InvoiceService
{
    public decimal CalculateInvoiceTotal(Invoice invoice)
    {
        decimal total = 0;
        foreach (var item in invoice.Items)
            total += item.Price * item.Quantity;
        return total;
    }
}
```

## Example: Applying DRY

```csharp
public static class PriceCalculator
{
    public static decimal CalculateTotal(IEnumerable<Item> items)
    {
        decimal total = 0;
        foreach (var item in items)
            total += item.Price * item.Quantity;
        return total;
    }
}

public class OrderService
{
    public decimal CalculateTotal(Order order) 
    {
        return PriceCalculator.CalculateTotal(order.Items);
    }
}

public class InvoiceService
{
    public decimal CalculateInvoiceTotal(Invoice invoice) 
    {
        return PriceCalculator.CalculateTotal(invoice.Items);
    }
}
```
## Summary

- Logic is centralized in `PriceCalculator`.
- Easy to update rules without touching multiple services.

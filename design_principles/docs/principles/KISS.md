### What is KISS? - Keep It Simple, Stupid
This principle encourages simplicity in design and implementation. 


### Why is KISS important?
- Simple code is easier to read and understand.
- Simple code is easier to maintain and debug.
- Complex code often hides bugs and slows development.


### How to apply KISS?

- No unnecessary reflections.
- No dot scan assembly when you can statically assign.
- Over generalization is bad (too many generics).
- Avoid over-engineering.

// bad example 
```csharp
public static class PaymentFactory
{
    public static IPaymentProcessor Create(string processorName)
    {
        // Scan all assemblies to find the matching class
        var type = AppDomain.CurrentDomain.GetAssemblies()
            .SelectMany(a => a.GetTypes())
            .FirstOrDefault(t => t.Name == processorName && typeof(IPaymentProcessor).IsAssignableFrom(t));

        if (type == null)
            throw new InvalidOperationException("Processor not found");

        // Use reflection to instantiate
        return (IPaymentProcessor)Activator.CreateInstance(type)!;
    }
}
```

// good example
```csharp
public static class PaymentFactory
{
    public static IPaymentProcessor Create(string processorName)
    {
        return processorName switch
        {
            "PayPal" => new PayPalProcessor(),
            "Stripe" => new StripeProcessor(),
            _ => throw new InvalidOperationException("Processor not found")
        };
    }
}

✅ Benefits of KISS
- Readable – anyone can understand it quickly.
- Maintainable – less risk of bugs.
- Efficient – no wasted complexity.
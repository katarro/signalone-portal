## Ejecutar en modo desarrollo en 2do plano

```bash
nohup composer run dev > dev.log 2>&1 &
```

## Eliminar el proceso en 2do plano

```bash
# Buscar el PID del proceso
ps aux | grep composer

# Matar el proceso (reemplaza XXXX con el PID)
kill XXXX
```